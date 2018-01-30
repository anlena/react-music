import {connect} from "react-redux"
import {showPlayer, changeSong, setSongs} from "../redux/action"
import Album from "../components/album/Album"

//映射dispatch到props上
const mapDispatchToPropps = (dispatch) => ({
  showMusicPlayer:(status) => {
    dispatch(showPlayer(status));
  },
  changeCurrentSong:(song) => {
    dispatch(changeSong(song));
  },
  setSongs:(songs) => {
    dispatch(setSongs(songs));
  }
})

//connect第一个参数用来映射store到组件props上，第二个参数是映射dispatch到props上，然后把Album组件传入，这里不需要获取store的状态，传入null
export default connect(null,mapDispatchToPropps)(Album)