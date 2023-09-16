import { useDispatch, useSelector } from "react-redux";

import { changeUserPhoto } from "../../store/auth/authApi";
import Loader from "../Loader/Loader";
import ImageLoad from "../ImageLoad/ImageLoad";

import "./uploadAvatar.scss";

function UploadAvatar() {
  const user = useSelector(state => state.auth.currentUser);
  const loading = useSelector(state => state.auth.loading);
  // const [src, setSrc] = useState(null);
  // const [preview, setPreview] = useState(null);
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  // const onClose = () => {
  //   setPreview(null);
  // }

  // const onCrop = (view) => {
  //   setPreview(view);
  // }

  // const handleSubmit = () => {
  //   setIsActive(false);
    // const img = new FormData();
    // console.log(preview);
    // img.append("photo", preview)
    // changeUser(dispatch, {photo: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"}, () => {}, 25)
  // }

  // const onFileLoad = (file) => {
  //   console.log(file, 'file');
  // }

  // const ref = useRef()

  // useEffect(() => {
  //   ref.current.value = ""
  // }, [isActive])
  
  const changeUserImg = (img) => {
    const photo = new FormData();
    photo.append("image", img);

    const payload = {
      photo,
      userId: user.id,
      photoId: user.photoId
    }
    changeUserPhoto(dispatch, payload);
  }

  return (
    <div className="upload-avatar">
      {/* <img src={preview} className="w-24 h-24 object-cover" onClick={() => setIsActive(true)} /> */}
      {/* <Modal isActive={isActive} setIsActive={setIsActive}>
        <Avatar
          src={imgg}
          img={preview}
          width={300}
          height={300}
          onClose={onClose}
          onCrop={onCrop}
          // onFileLoad={onFileLoad}
          label="Выберите фото"
          labelStyle={{fontFamily: "Roboto", fontSize: "1.2rem"}}
        />
        <button className="button" onClick={handleSubmit}>OK</button>
      </Modal> */}
        <div className="avatar-img">
          <input id="file-img" type="file" onChange={(e) => changeUserImg(e.target.files[0])} />
          <label htmlFor="file-img" className="relative">
            {loading ? <span className="absolute"><Loader /></span> : null}
            <ImageLoad src={user.photo} className="!m-0" />
          </label>
        </div>
    </div>
  )
}

export default UploadAvatar;
