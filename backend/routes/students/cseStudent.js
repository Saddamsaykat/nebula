router.post("/", async (req, res) => {
  try {
    const {
      batch,
      firstName,
      lastName,
      email,
      number,
      gender,
      presentAddress,
      permanentAddress,
      whatsUp,
      aboutYour,
      facebook,
      linkedin,
      github,
      image,
      role,
      studentId,
      country,
      city,
      agree,
      jobType,
      jobCategoryData,
    } = req.body;

    // Validate required fields
    if (!batch || !firstName || !email || !number) {
      return res.status(400).json({
        message: "Missing required fields!",
      });
    }

    // Check if email already exists in any CSE student
    const emailExists = await studentsCollection.findOne({
      CSE: {
        $elemMatch: {
          email: email,
        },
      },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    const batchData = await studentsCollection.findOne({ batch });

    const studentData = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      number,
      gender,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
      image,
      role,
      studentId,
      country,
      city,
      agree,
      jobType,
      jobCategoryData,
    };

    if (!batchData) {
      // Create new batch with CSE array
      await studentsCollection.insertOne({
        batch,
        CSE: [studentData],
      });
    } else {
      // Push new student into existing CSE array
      await studentsCollection.updateOne(
        { batch },
        {
          $push: { CSE: studentData },
        }
      );
    }

    res.status(201).json({
      message: "Student added successfully!",
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
