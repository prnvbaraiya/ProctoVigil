###For User Quiz ZC

// localStream = await instance.createStream({
// camera: {
// audioInput: deviceInfo.microphones[0].deviceID,
// videoInput: deviceInfo.cameras[1].deviceID,
// video: false,
// audio: false,
// },
// });

// const localView = instance.createLocalStreamView(localStream);
// instance.startPublishingStream(
// new Date().getTime().toString(),
// localStream,
// { videoCodec: "VP8" }
// );

// localView.play("local-stream", {
// mirror: true,
// objectFit: "cover",
// enableAutoplayDialog: true,
// });

### Todo

- [ ] Database setup mongo
- [ ] Admin collection
- [ ] User collection
- [ ] Quiz collection

- [ ] Complete Admin Side
- [x] Admin Login Page
- [x] Admin Layout
- [ ] Admin Dashboard Page
- [ ] Admin Quiz Page
- [ ] Admin Add Update Quiz Page
- [ ] Admin Add Quiz Using csv file
- [x] Admin Stream Page
- [x] Admin watch Stream Page
- [x] Set up watch Stream with watching data
- [ ] Add zegocloud sdk for proctaring custom ui
- [ ] Admin Proctar Student Page

- [ ] Complete User Side
- [ ] User Login Page
- [x] User Layout
- [ ] User get all the permissions and validate do not start until all the conditions follow
- [x] User Quiz Page
- [ ] User send data to zegocloud Page

- [ ] Account setup in zegocloud
- [ ] Add JWT token both side
