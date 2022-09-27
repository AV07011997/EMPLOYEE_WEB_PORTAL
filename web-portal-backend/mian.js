// Requiring mongoose module
// const mongoose = require('mongoose');

// Importing Models Student and Course from model.js
import { personalinfoSchema, documentsinfoSchema } from './model';

// Connecting to database
mongoose.connect('mongodb://localhost:27017/myloginDB',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

var dbcourse = [];

// Finding courses of category Database
dbcourse.find({ category: "Database" })
	.then(data => {
		console.log("Database Courses:")
		console.log(data);

		// Putting all course id's in dbcourse array
		data.map((d, k) => {
			dbcourse.push(d._id);
		})

		// Getting students who are enrolled in any
		// database course by filtering students
		// whose courseId matches with any id in
		// dbcourse array
		Student.find({ courseId: { $in: dbcourse } })
			.then(data => {
				console.log("Students in Database Courses:")
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			})
	})
	.catch(error => {
		console.log(error);
	})
