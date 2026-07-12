import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";
import Comment from "./models/Comment.js";

// Load environment variables
dotenv.config();

// Sample data for testing the YouTube Clone
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old data
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});
    console.log("Old data cleared");

    // Create sample users
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user1 = await User.create({
      username: "john",
      email: "john@example.com",
      password: hashedPassword,
    });

    const user2 = await User.create({
      username: "sara",
      email: "sara@example.com",
      password: hashedPassword,
    });

    console.log("Users created");

    // Create sample channels
    const channel1 = await Channel.create({
      channelName: "Code Academy",
      owner: user1._id.toString(),
      description: "Learn coding with simple tutorials.",
      banner: "https://picsum.photos/1200/200?random=101",
      subscribers: 1200,
      videoCount: 0,
    });

    const channel2 = await Channel.create({
      channelName: "Game Zone",
      owner: user2._id.toString(),
      description: "Best gaming highlights and gameplay.",
      banner: "https://picsum.photos/1200/200?random=102",
      subscribers: 850,
      videoCount: 0,
    });

    console.log("Channels created");

    // Local sample videos from frontend/public/videos (always playable)
    const sampleVideoUrls = [
      "/videos/sample1.mp4",
      "/videos/sample2.mp4",
    ];

    const videos = await Video.insertMany([
      {
        title: "Learn React in 30 Minutes",
        description: "A quick beginner-friendly guide to learning React.",
        thumbnailUrl: "https://picsum.photos/320/180?random=1",
        videoUrl: sampleVideoUrls[0],
        category: "Coding",
        channelId: channel1._id.toString(),
        channelName: channel1.channelName,
        views: 1200,
        likes: 45,
        dislikes: 2,
      },
      {
        title: "JavaScript Basics for Beginners",
        description: "Learn JavaScript from scratch with simple examples.",
        thumbnailUrl: "https://picsum.photos/320/180?random=6",
        videoUrl: sampleVideoUrls[1],
        category: "Coding",
        channelId: channel1._id.toString(),
        channelName: channel1.channelName,
        views: 920,
        likes: 40,
        dislikes: 1,
      },
      {
        title: "Top 10 Gaming Moments 2024",
        description: "The most exciting gaming moments from 2024.",
        thumbnailUrl: "https://picsum.photos/320/180?random=2",
        videoUrl: sampleVideoUrls[0],
        category: "Gaming",
        channelId: channel2._id.toString(),
        channelName: channel2.channelName,
        views: 850,
        likes: 32,
        dislikes: 3,
      },
      {
        title: "Epic Battle Royale Gameplay",
        description: "Full battle royale gameplay with epic wins.",
        thumbnailUrl: "https://picsum.photos/320/180?random=7",
        videoUrl: sampleVideoUrls[0],
        category: "Gaming",
        channelId: channel2._id.toString(),
        channelName: channel2.channelName,
        views: 1800,
        likes: 65,
        dislikes: 4,
      },
      {
        title: "Relaxing Music for Study",
        description: "Calm music to help you focus while studying.",
        thumbnailUrl: "https://picsum.photos/320/180?random=3",
        videoUrl: sampleVideoUrls[1],
        category: "Music",
        channelId: channel1._id.toString(),
        channelName: channel1.channelName,
        views: 3500,
        likes: 120,
        dislikes: 5,
      },
      {
        title: "Football Highlights - Best Goals",
        description: "The best football goals from recent matches.",
        thumbnailUrl: "https://picsum.photos/320/180?random=5",
        videoUrl: sampleVideoUrls[1],
        category: "Sports",
        channelId: channel2._id.toString(),
        channelName: channel2.channelName,
        views: 2100,
        likes: 78,
        dislikes: 4,
      },
      {
        title: "Breaking News Today",
        description: "Latest breaking news from around the world.",
        thumbnailUrl: "https://picsum.photos/320/180?random=4",
        videoUrl: sampleVideoUrls[0],
        category: "News",
        channelId: channel1._id.toString(),
        channelName: channel1.channelName,
        views: 500,
        likes: 8,
        dislikes: 1,
      },
      {
        title: "Build a Todo App with React",
        description: "Step by step tutorial to build a todo app.",
        thumbnailUrl: "https://picsum.photos/320/180?random=11",
        videoUrl: sampleVideoUrls[1],
        category: "Education",
        channelId: channel1._id.toString(),
        channelName: channel1.channelName,
        views: 650,
        likes: 28,
        dislikes: 2,
      },
    ]);

    // Update video counts
    channel1.videoCount = 5;
    channel2.videoCount = 3;
    await channel1.save();
    await channel2.save();

    console.log("Videos created:", videos.length);

    // Create sample comments
    await Comment.create({
      videoId: videos[0]._id.toString(),
      userId: user2._id.toString(),
      username: user2.username,
      text: "Great tutorial! Very helpful.",
    });

    await Comment.create({
      videoId: videos[0]._id.toString(),
      userId: user1._id.toString(),
      username: user1.username,
      text: "Thanks for watching!",
    });

    console.log("Comments created");
    console.log("Seed completed successfully!");
    console.log("Login with: john@example.com / 123456");
    console.log("Or: sara@example.com / 123456");

    process.exit(0);
  } catch (error) {
    console.log("Seed failed:", error.message);
    process.exit(1);
  }
};

seedData();
