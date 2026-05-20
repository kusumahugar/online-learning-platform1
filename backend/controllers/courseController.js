const Course = require('../models/Course');

const sampleCourses = [
  {
    title: 'Full Stack Web Development',
    description:
      'Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB by building real-world projects.',
    instructor: 'John Smith',
    duration: '12 Weeks',
    price: 99,
  },
  {
    title: 'DevOps Masterclass',
    description:
      'Master Git, GitHub, Docker, Jenkins, Kubernetes, and CI/CD pipelines.',
    instructor: 'Sarah Johnson',
    duration: '10 Weeks',
    price: 149,
  },
  {
    title: 'Python for Data Science',
    description:
      'Learn Python, Pandas, NumPy, Matplotlib, and machine learning basics.',
    instructor: 'Michael Brown',
    duration: '8 Weeks',
    price: 79,
  },
  {
    title: 'AWS Cloud Practitioner',
    description:
      'Understand core AWS services including EC2, S3, IAM, RDS, and VPC.',
    instructor: 'Emily Davis',
    duration: '6 Weeks',
    price: 89,
  },
  {
    title: 'Cyber Security Fundamentals',
    description:
      'Explore ethical hacking, network security, and penetration testing.',
    instructor: 'David Wilson',
    duration: '9 Weeks',
    price: 119,
  },
  {
    title: 'UI/UX Design Bootcamp',
    description:
      'Design modern interfaces using Figma, wireframes, and design systems.',
    instructor: 'Sophia Taylor',
    duration: '7 Weeks',
    price: 69,
  },
];

exports.getCourses = async (req, res) => {
  try {
    let courses = await Course.find();

    // If database is empty, return sample courses
    if (!courses || courses.length === 0) {
      return res.json(sampleCourses);
    }

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Even if DB has an issue, still return sample data
    res.json(sampleCourses);
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    // Check sample courses first (used when DB is empty)
    const sampleCourse = sampleCourses.find(
      (_, index) => String(index) === req.params.id
    );

    if (sampleCourse) {
      return res.json({ ...sampleCourse, _id: req.params.id });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course' });
  }
};