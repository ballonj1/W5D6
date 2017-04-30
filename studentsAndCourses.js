function Student(first, last) {
  this.first = first;
  this.last = last;
  this.courses = [];
}

Student.prototype.name = function(){
  return `${this.first} ${this.last}`;
};

Student.prototype.enroll = function(course){
  this.courses.forEach(enrolledCourse => {
    //raise error if enrolledCourse conflicts with course
    if (enrolledCourse.conflictsWith(course)){
      throw "There's a conflict.";
    }
  });
  if(!this.courses.includes(course)){
    this.courses.push(course);
    course.students.push(this);
  }
};

Student.prototype.courseLoad = function() {
  let load = {};
  this.courses.forEach(function(course) {
    if (load[course.department]){
      load[course.department] += course.credits;
    } else {
      load[course.department] = course.credits;
    }
  });

  return load;
};

function Course(name, department, credits, days, timeBlock){
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.days = days;
  this.timeBlock = timeBlock;
  this.students = [];
}

Course.prototype.addStudent = function(student){
  student.enroll(this);
};

Course.prototype.conflictsWith = function(course){
  let conflicts = false;
  this.days.forEach((day) => {
    if (course.days.includes(day) && this.timeBlock === course.timeBlock){
      conflicts = true;
    }
  });
  return conflicts;
};

const amy = new Student("Amy", "Stevens");
const english1 = new Course("English 101", "English", 4, ['mon', 'wed'], 2);
const chem1 = new Course("Chemistry 101", "Chemistry", 4, ['mon', 'wed'], 1);
const chem2 = new Course("Chemistry 102", "Chemistry", 4, ['mon', 'wed'], 1);

console.log(chem1.conflictsWith(chem2));
amy.enroll(chem1);
amy.enroll(english1);
console.log(amy.courses);
