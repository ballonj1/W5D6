function Student(first, last) {
  this.first = first;
  this.last = last;
  this.courses = [];
}

Student.prototype.name = function(){
  return `${this.first} ${this.last}`;
};

Student.prototype.enroll = function(course){
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

function Course(name, department, credits){
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.students = [];
}

Course.prototype.addStudent = function(student){
  student.enroll(this);
};

const amy = new Student("Amy", "Stevens");
const english1 = new Course("English 101", "English", 4);
const chem1 = new Course("Chemistry 101", "Chemistry", 4);
const chem2 = new Course("Chemistry 102", "Chemistry", 4);

amy.enroll(english1);
console.log(english1.students);
amy.enroll(chem1);
amy.enroll(chem2);
console.log(amy.courseLoad());
