// import logo from './logo.svg';
import ConvoItem from './ConvoItem';
import { React, useEffect, useState, useContext}  from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReplyForm from './ReplyForm';
import { Image } from 'react-bootstrap';
import ConvoThumbnail from './ConvoThumbnail';
import { UserContext } from '../../UserContext';
import { RiContactsBookLine } from 'react-icons/ri';



export default function Messages(props) {
  console.log("Props in messages", props)
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);
  const { user_id, recipient_id } = useParams();

  let userObj = (id) => {
    return props.users.filter((u) => u.id === id)[0]
  }

  useEffect(() => {
    const apiURL = `/api/messages/${recipient_id}/${user_id}`
    // if (user.id === user_id) {
    //   const apiURL = `/api/messages/${recipient_id}/${user_id}`
    //   const pate = "fdfwe"
    // } else {
    //   const apiURL = `/api/messages/${user_id}/${recipient_id}`
    // }
    axios({
      method: 'GET',
      //url: `/api/messages/25/${user_id}`
      url: apiURL
    })
    .then(({
      data
    }) => {
      console.log("messages query result", data)
      setThread(data)
      //console.log("THREAD ZERO",userObj(thread[0].sender_id))
      setLoading(false);
      })
      .catch((err) => console.log(err));
    }, []);

    const messagesRendered = (array) => {
      //const sortByMostRecent = thread.reverse()
      //console.log("thread", thread, "sorted", sortByMostRecent)
      return (array.map((message, index) => {
        // if (parseInt(user_id) === data[0].sender_id){
        //   senderPres = "You Wrote";
        // } else {
        //   senderPres = `${userObj(writeTo)} wrote`
        //   console.log("userOBj",userObj(writeTo) )
        // }
        return (
          <ConvoItem
            key={index}
            sender={message.sender_id}
            receiver = {message.receiver_id}
            message = {message.message}
            sentDate = {message.sentdate}
            room = {message.room_id}
            applicant = {message.applicant_id}
            //recipient_name = {userObj(writeTo).firstname}
           // senderPres = {senderPres}
          />
        )
      }))
    }
    //console.log("messages Rendered", messagesRendered(thread))
    const destination = () => {

      
    }
   // console.log("destination", destination(thread))

    return (
      <div>
      {loading && <div>LOADING</div>}
      {!loading &&  (
        <div className="convoPage">
          <div className="convoReply">
          <ReplyForm
            userLogged={user.id}
            recipient={thread[0].receiver_id}
            room={thread[0].room_id}
            applicant={thread[0].applicant_id}
            recipient_name={userObj(thread[0].sender_id).firstname}
            placeholder="Hello"
          ><Image className="convoWrite" src="/write.png"/>
          </ReplyForm>
          </div>  
          <div className="convoMessages" >
        {/*     <div className="messagesCard">  */}
            <ConvoThumbnail
              recipientUser = {userObj(thread[0].sender_id)}
            /> 
        {/*     </div> */}
            <div className="messagesText">
             {messagesRendered(thread)} 
            </div>
          </div>

        </div>
      )
      }
      </div>

    )

}