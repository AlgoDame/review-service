import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IGenre, Language } from '../models/reviewers.model';
import Reviewer from '../models/reviewers.model';
import connectDB from './connection';

const sampleReviewers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    bio: 'Passionate book reviewer with 5 years of experience',
    profileImage: 'https://example.com/profile-image.jpg',
    status: 'active',
    preferredGenres: [IGenre.fiction, IGenre.nonFiction, IGenre.science],
    primaryLanguage: Language.english,
    languages: [Language.english, Language.french]
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    password: 'password123',
    bio: 'Literary critic specializing in science fiction',
    profileImage: 'https://example.com/profile-image2.jpg',
    status: 'active',
    preferredGenres: [IGenre.fiction, IGenre.science, IGenre.business],
    primaryLanguage: Language.english,
    languages: [Language.english, Language.spanish, Language.german]
  },
  {
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mariorossi@example.com',
    password: 'password123',
    bio: 'Business book reviewer and consultant',
    profileImage: 'https://example.com/profile-image3.jpg',
    status: 'active',
    preferredGenres: [IGenre.business, IGenre.productivity, IGenre.selfHelp],
    primaryLanguage: Language.italian,
    languages: [Language.italian, Language.english, Language.french]
  },
  {
    firstName: 'Sophie',
    lastName: 'Chen',
    email: 'sophiechen@example.com',
    password: 'password123',
    bio: 'Multilingual reviewer specializing in personal development',
    profileImage: 'https://example.com/profile-image4.jpg',
    status: 'active',
    preferredGenres: [IGenre.personalDevelopment, IGenre.spirituality, IGenre.health],
    primaryLanguage: Language.chinese,
    languages: [Language.chinese, Language.english, Language.japanese]
  },
  {
    firstName: 'Hans',
    lastName: 'Mueller',
    email: 'hansmueller@example.com',
    password: 'password123',
    bio: 'Academic reviewer focusing on scientific literature',
    profileImage: 'https://example.com/profile-image5.jpg',
    status: 'active',
    preferredGenres: [IGenre.science, IGenre.health, IGenre.nonFiction],
    primaryLanguage: Language.german,
    languages: [Language.german, Language.english, Language.french]
  }
];

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();

    // Clear existing reviewers
    await Reviewer.deleteMany({});

    // Hash passwords and create reviewers
    const reviewersWithHashedPasswords = await Promise.all(
      sampleReviewers.map(async (reviewer) => {
        const hashedPassword = await bcrypt.hash(reviewer.password, 10);
        return {
          ...reviewer,
          password: hashedPassword
        };
      })
    );

    // Insert reviewers
    await Reviewer.insertMany(reviewersWithHashedPasswords);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
