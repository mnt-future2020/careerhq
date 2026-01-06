import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import University from "@/models/University";
import Country from "@/models/Country";
import { generateCourseSlug } from "@/lib/slug-utils";
import type { CreateCourseData } from "@/types/education";

interface CourseQuery {
  countryId?: string;
  universityId?: string;
  studyLevel?: string;
  $text?: { $search: string };
  published?: { $ne: boolean };
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get("countryId");
    const universityId = searchParams.get("universityId");
    const studyLevel = searchParams.get("studyLevel");
    const populate = searchParams.get("populate") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const includeUnpublished =
      searchParams.get("includeUnpublished") === "true";

    const query: CourseQuery = {};

    if (countryId) query.countryId = countryId;
    if (universityId) query.universityId = universityId;
    if (studyLevel) query.studyLevel = studyLevel;
    if (search) {
      query.$text = { $search: search };
    }

    // By default only show published courses
    if (!includeUnpublished) {
      query.published = { $ne: false };
    }

    const skip = (page - 1) * limit;

    let coursesQuery = Course.find(query)
      .sort(search ? { score: { $meta: "textScore" } } : { programName: 1 })
      .skip(skip)
      .limit(limit);

    if (populate) {
      coursesQuery = coursesQuery
        .populate("universityId", "name location ranking")
        .populate("countryId", "name code flagImageId");
    }

    const [coursesResult, total] = await Promise.all([
      coursesQuery,
      Course.countDocuments(query),
    ]);

    // Transform the data to match the expected interface
    const courses = populate
      ? coursesResult.map((course) => ({
        ...course.toJSON(),
        university: course.universityId, // Move populated university data to 'university' field
        country: course.countryId, // Move populated country data to 'country' field
        universityId:
          course.universityId?._id?.toString() || course.universityId, // Keep original universityId
        countryId: course.countryId?._id?.toString() || course.countryId, // Keep original countryId
      }))
      : coursesResult;

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data: CreateCourseData = await request.json();

    // Validate required fields
    const requiredFields = [
      "universityId",
      "countryId",
      "programName",
    ];

    const missingFields = [];
    for (const field of requiredFields) {
      const value = data[field as keyof CreateCourseData];
      if (value === undefined || value === null || value === "") {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify university and country exist
    const [university, country] = await Promise.all([
      University.findById(data.universityId),
      Country.findById(data.countryId),
    ]);

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json({ error: "Country not found" }, { status: 400 });
    }

    // Verify university belongs to the country
    if (university.countryId.toString() !== data.countryId) {
      return NextResponse.json(
        { error: "University does not belong to the specified country" },
        { status: 400 }
      );
    }

    // Generate unique slug for the course
    const baseSlug = generateCourseSlug(data.programName);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (true) {
      const existingCourse = await Course.findOne({ slug });
      if (!existingCourse) {
        break; // Slug is unique
      }

      // Generate new slug with counter
      slug = `${baseSlug}-${counter}`;
      counter++;

      // Safety check to prevent infinite loop
      if (counter > 1000) {
        return NextResponse.json(
          { error: "Unable to generate unique course identifier" },
          { status: 500 }
        );
      }
    }

    const course = new Course({ ...data, slug });
    await course.save();

    // Populate related data for response
    await course.populate([
      { path: "universityId", select: "name location ranking" },
      { path: "countryId", select: "name code flagImageId" },
    ]);

    // Transform the data to match the expected interface
    const courseResponse = {
      ...course.toJSON(),
      university: course.universityId, // Move populated university data to 'university' field
      country: course.countryId, // Move populated country data to 'country' field
      universityId: course.universityId?._id?.toString() || course.universityId, // Keep original universityId
      countryId: course.countryId?._id?.toString() || course.countryId, // Keep original countryId
    };

    return NextResponse.json({ course: courseResponse }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    // Handle duplicate key error specifically
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      const duplicateField = (error as any).keyValue;
      console.log("Duplicate key error:", duplicateField);
      return NextResponse.json(
        { error: `A course with this ${Object.keys(duplicateField)[0]} already exists` },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationErrors = (error as any).errors;
      const errorMessages = Object.keys(validationErrors).map(key => 
        `${key}: ${validationErrors[key].message}`
      );
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages.join(', ')}` },
        { status: 400 }
      );
    }

    // Handle cast errors (invalid ObjectId)
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: `Invalid ID format: ${(error as any).path}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to create course",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
