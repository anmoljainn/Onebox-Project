import { useEffect, useState } from "react"

function EmailMasterSlave({email, getFavEmail}) {
    
    const[date, setDate] = useState()

    useEffect(() => {
        setDate(dateAndTimeConvertor())
    },[email])

    function dateAndTimeConvertor()
    {
        //date and time calculation
        var date = new Date(email.date)
        var time = ""
        if (date.getHours() >= 12) {
            time = "0" + date.getHours() % 12 + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"pm"
        }
        else{
            time = "0" + date.getHours() + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"am"
        }
        var date_format_str = (date.getDate().toString().length==2?date.getDate().toString():"0"+date.getDate().toString())+"/"+((date.getMonth()+1).toString().length==2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"/"+date.getFullYear().toString()+" "+time; 
        return date_format_str
      
    }
    
    function handleFavorite(id) {
        getFavEmail(id)
    }

    return (
        <>
            <div className='slave--main'>
                <div className='user--avatar font--light--white'>
                    <p>{email.from.name.charAt(0).toUpperCase()}</p>
                </div>

                <div className='slave--content'>
                    <div className='subject--fav--btn'>
                        <div className='font--xl-medium-black'>
                            {email.subject}
                        </div>
                        <div className='fav--btn font--light--white'
                            onClick={() => handleFavorite(email.id)}
                        >
                            <p>Mark as Favorite</p>
                        </div>
                    </div>
                    
                    <div className='slave--body'>
                        {date}
                    </div>
                    <div className='slave--body' dangerouslySetInnerHTML={{ __html: email.body }}></div>
                </div>
            </div>
        </>
    )
}

export default EmailMasterSlave; 