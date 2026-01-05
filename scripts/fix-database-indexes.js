import { MongoClient } from 'mongodb';

// Use the MongoDB URI directly
const MONGODB_URI = "mongodb+srv://benitasamson_db_user:KmaOPnOxaMtN5hao@cluster0.bzqr2kt.mongodb.net/career-hq";

async function fixDatabaseIndexes() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('career-hq');
    const coursesCollection = db.collection('courses');
    
    // 1. Drop the problematic slug index
    try {
      await coursesCollection.dropIndex('slug_1');
      console.log('Dropped slug_1 index');
    } catch (error) {
      console.log('Index slug_1 may not exist:', error.message);
    }
    
    // 2. Count courses with null slugs
    const nullSlugCount = await coursesCollection.countDocuments({
      $or: [
        { slug: null },
        { slug: "" },
        { slug: { $exists: false } }
      ]
    });
    console.log(`Found ${nullSlugCount} courses with null/empty slugs`);
    
    // 3. Generate slugs for courses that don't have them
    const coursesWithoutSlugs = await coursesCollection.find({
      $or: [
        { slug: null },
        { slug: "" },
        { slug: { $exists: false } }
      ]
    }).toArray();
    
    console.log(`Processing ${coursesWithoutSlugs.length} courses...`);
    
    for (let i = 0; i < coursesWithoutSlugs.length; i++) {
      const course = coursesWithoutSlugs[i];
      
      if (i % 100 === 0) {
        console.log(`Processed ${i}/${coursesWithoutSlugs.length} courses`);
      }
      
      // Generate slug from program name
      let baseSlug = course.programName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      
      let slug = baseSlug;
      let counter = 1;
      
      // Check if slug exists and make it unique
      while (true) {
        const existingCourse = await coursesCollection.findOne({
          slug: slug,
          _id: { $ne: course._id }
        });
        
        if (!existingCourse) {
          break;
        }
        
        slug = `${baseSlug}-${counter}`;
        counter++;
        
        if (counter > 1000) {
          slug = `${baseSlug}-${Date.now()}`;
          break;
        }
      }
      
      // Update the course with the new slug
      await coursesCollection.updateOne(
        { _id: course._id },
        { $set: { slug: slug } }
      );
    }
    
    console.log('Finished updating all courses with slugs');
    
    // 4. Create a new sparse unique index
    await coursesCollection.createIndex(
      { slug: 1 }, 
      { 
        unique: true, 
        sparse: true,
        name: 'slug_1_sparse'
      }
    );
    console.log('Created new sparse unique index on slug');
    
    // 5. Verify the fix
    const remainingNullSlugs = await coursesCollection.countDocuments({
      $or: [
        { slug: null },
        { slug: "" },
        { slug: { $exists: false } }
      ]
    });
    
    console.log(`Remaining courses with null slugs: ${remainingNullSlugs}`);
    
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

fixDatabaseIndexes();