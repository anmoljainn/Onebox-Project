import { useEffect, useState } from "react";


function Filter({ emails, mainDisplayOn, toggleMenu,display }) {
    
    const [filteredEmails, setFilteredEmails] = useState()
    const [currentMenu, setCurrentMenu] = useState("")

    useEffect(() => {
        renderFilteredCards()
    },[currentMenu])


    function handleFilterMenuClick(menuSelected) {
        setCurrentMenu(menuSelected)
        toggleMenu(menuSelected)
    }

    let renderFilteredEmails; 

    function renderFilteredCards() {
        console.log("Inside filter, ", mainDisplayOn)
        if (!mainDisplayOn) {
            if (currentMenu == "read") {
                renderFilteredEmails = emails.filter((item) => item.read)
            } else if (currentMenu == "unread") {
                renderFilteredEmails = emails.filter((item) => !item.read) 
            }else if (currentMenu == "fav") {
                renderFilteredEmails = emails.filter((item) => item.fav)
            }
        }
        console.log("Inside filter, ", renderFilteredEmails)

        setFilteredEmails(renderFilteredEmails)
    }

        return (
            <>
                <section className="filter--main">
                    <p className="filter--text"
                        onClick={() => handleFilterMenuClick("all")}
                    >
                        All
                    </p>
                    
                    <p className="filter--text"
                        onClick={() => handleFilterMenuClick("read")}
                    >
                        Read
                    </p>
                    <p className="filter--text"
                        onClick={() => handleFilterMenuClick("unread")}
                    >
                        Unread
                    </p>
                    <p className="filter--text"
                        onClick={() => handleFilterMenuClick("fav")} >
                        Favorite
                    </p>
                </section>

                <section className={display ? "email--main--shrink" : "email--main"}>
                    <div className={display ? "email--container--shrink" : "email--container"}>
                        {filteredEmails && 
                            filteredEmails.map((item) => {

                                //date and time calculation
                                var date = new Date(item.date)
                                var time = ""
                                if (date.getHours() >= 12) {
                                    time = "0" + date.getHours() % 12 + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"pm"
                                }
                                else{
                                    time = "0" + date.getHours() + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"am"
                                }
                                var date_format_str = (date.getDate().toString().length==2?date.getDate().toString():"0"+date.getDate().toString())+"/"+((date.getMonth()+1).toString().length==2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"/"+date.getFullYear().toString()+" "+time; 
                                
                                //first name and avatar computation
                                var name = item.from.name.charAt(0).toUpperCase()
                                name = name + item.from.name.substring(1)
                            
                                return (
                                    <div
                                        key={item.id}
                                        className={item.read ? "email--card read--bgc" : "email--card unread--bgc"}
                                        onClick={() => {
                                            fetchCurrentEmail(item.id)
                                        }}
                                        id={item.id}
                                    >
                                        <div className='user--avatar font--light--white'>
                                            <p>{item.from.name.charAt(0).toUpperCase()}</p>
                                        </div>
                                        <div className='email--details'>
                                            <p className='email--from--name font--xs-medium-grey'>
                                                From: <span className='font--xs-bold-black'>
                                                {name} &lt;{item.from.email}&gt;
                                                </span>
                                            </p>
                                            <p className='email--subject font--xs-medium-grey'>
                                                Subject: <span className='font--xs-bold-black'>
                                                    {item.subject}
                                                </span>
                                            </p>
                                            <p className='email--description font--xs-medium-grey'>
                                                {item.short_description}
                                            </p>
                        
                                            <div className='date--time--fav'>
                                                <p className='email--date--time font--xs-medium-grey mt05'>
                                                    {date_format_str}
                                                </p>
                                                {
                                                    item.fav && 
                                                    <p className='font--xs-bold-accent pl1'>Favorite</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    )
                        })
                        }
                    </div>
                </section>
                
            </>
        )
}
   

export default Filter;