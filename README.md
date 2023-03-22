### To start Project

- 1. Install all the packages for frontend & backend.
- 2. If you are running first time then go to next step otherwise go to step 4.
- 3. Open two terminal and run `npm run newFrontend` and in second terminal run `npm run newBackend`
- 4. Open two terminal and run `npm run frontend` and in second terminal run `npm run backend`
- 5. Your project is running localhost port for frontend 5173 and backend 1322.

### Scope

- Only 50 can Join Quiz
- Internet Bandwidth needs More than 5Mbps
- Maximum number of Random Question is 50

### Todo

- [ ] Database setup mongo
- [x] Admin collection
- [x] User collection
- [x] Quiz collection
- [ ] Result Quiz collection
- [ ] Notification collection

- [ ] Complete Admin Side
- [x] Admin Login Page
- [x] Admin Layout
- [ ] Admin Dashboard Page
- [x] Admin Student Page
- [x] Add/Edit User Page
- [x] User Crud Operations
- [x] Admin Quiz Page
- [x] Admin Add Update Quiz Page
- [ ] Admin Add Quiz Using csv file
- [ ] Add Quiz with types
- [ ] Add Quiz with sections(with sections time)
- [ ] Interview Feature
- [ ] Marking System automatic or manual
- [x] In Add Quiz add random number question
- [x] Admin Stream Page
- [x] Admin watch Stream Page
- [x] Admin watch Stream of more than one student
- [x] Set up watch Stream with watching data
- [x] Change Phase for quiz
- [x] Result Page for quiz
- [x] Add zegocloud sdk for proctaring custom ui
- [x] Admin Proctar Student Page

- [ ] Complete User Side
- [ ] User Login Page
- [x] User Layout
- [ ] In Instruction Page add mice sound check for checking mice working
- [x] User get all the permissions and validate do not start until all the conditions follow
- [x] User Quiz Page
- [x] User Attempt Quiz Page
- [ ] User Result Quiz Page
- [x] User send data to zegocloud Page
- [ ] Make Zego Context
- [ ] Add Form Validation

- [x] Account setup in zegocloud
- [x] Add JWT token both side
- [x] Add Mailing system
- [ ] Forget Password Mail link
- [ ] Once user verify email then only start quiz
- [x] Sending Results
- [ ] Make Feedback Database

### Bugs

- [x] In basic table hide is not working
- [x] JWT token null on page refresh so store in cookie
- [x] Attempt Quiz not working Properly First Ask Permissions(Test Page)
- [ ] Add online status for admin to check which student online
- [x] End date Never be less than start Date
- [ ] when Exam starts, disable edit quiz option
- [x] when user deleted if user is student delete from quizresult and quiz.student,userRecording
- [ ] Quiz deleted, delete from quiz Result, userRecording
- [x] User delete modal text
- [ ] User Update => update quiz Student
- [x] Add Loading Spinner
- [ ] Add Redux for passing VideoRef
- [ ] When Time become 00:00:00 end the quiz
- [ ] User can only give quiz once

### Progress

- [x] 20% webrtc module & quiz module & frontend layout
- [x] 40% admin can add users & quiz & admin profile setting
- [ ] 60% all the result will be disply & send mail & quiz with subjective and different sections
- [ ] 75% integrate the lms system with quiz & bug fixes
- [ ] 100% integrate ai quiz and lms system
