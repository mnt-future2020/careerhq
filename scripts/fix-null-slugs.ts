import { connectToDatabase } from "../src/lib/mongodb";
import Course from "../src/models/Course";
import { generateCourseSlug } from "../src/lib/slug-utils";

async function fixNullSlugs() {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    // Find all courses with null or empty slugs
    const coursesWithNullSlugs = await Course.find({
      $or: [
        { slug: null },
        { slug: "" },
        { slug: { $exists: false } }
      ]
    });

    console.log(`Found ${coursesWithNullSlugs.length} courses with null/empty slugs`);

    for (let i = 0; i < coursesWithNullSlugs.length; i++) {
      const course = coursesWithNullSlugs[i];
      console.log(`Processing course ${i + 1}/${coursesWithNullSlugs.length}: ${course.programName}`);

      // Generate base slug
      const baseSlug = generateCourseSlug(course.programName);
      let slug = baseSlug;
      let counter = 1;

      // Check if slug already exists and make it unique
      while (true) {
        const existingCourse = await Course.findOne({
          slug: slug,
          _id: { $ne: course._id }
        });

        if (!existingCourse) {
          break; // Slug is unique
        }

        // Generate new slug with counter
        slug = `${baseSlug}-${counter}`;
        counter++;

        // Safety check
        if (counter > 1000) {
          console.error(`Unable to generate unique slug for course: ${course.programName}`);
          slug = `${baseSlug}-${Date.now()}`; // Use timestamp as fallback
          break;
        }
      }

      // Update the course with the new slug
      await Course.updateOne(
        { _id: course._id },
        { $set: { slug: slug } }
      );

      console.log(`Updated course "${course.programName}" with slug: ${slug}`);
    }

    console.log("Finished fixing null slugs");
  } catch (error) {
    console.error("Error fixing null slugs:", error);
  } finally {
    process.exit(0);
  }
}

fixNullSlugs();