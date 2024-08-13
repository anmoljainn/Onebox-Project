import { useState, useEffect } from "react";
import Filter from "./Filter";
import EmailCards from "./EmailCards";


function EmailApp() {

    const [emails, setEmails] = useState([])
    const [mainDisplayOn, setMainDisplayOn] = useState(true)

    useEffect(() => {
        fetchEmails()
    }, []);

    async function fetchEmails() {
        let tempEmails = []
        await fetch("https://flipkart-email-mock.now.sh/")
            .then((response) => { return response.json() })
            .then((data) => tempEmails = [...data.list])
            .then((tempEmails) => {
                return tempEmails.map((item) => {
                    Object.assign(item, { read: false, fav: false})
                })
            })
            .then(() => setEmails(tempEmails))
    }

    function setReadUnreadStatus(id) {
        setEmails((prevEmails) => {
            return prevEmails.map((item) => {
                if (item.id == id) {
                    return {...item, read: true}
                }
                return item;
            })
        })
    }

    function setFavStatus(id) {
        setEmails((prevEmails) => {
            return prevEmails.map((item) => {
                if (item.id == id) {
                    return {...item, fav: true}
                }
                return item;
            })
        })
    }

    function toggleMenu(menuId) {
        if (menuId == "all") {
            setMainDisplayOn(true)
        } else {
            setMainDisplayOn(false)
        }
    }

    return (
        <>
        <section className='main'> 
            <Filter
                emails={emails}
                mainDisplayOn={mainDisplayOn}
                toggleMenu={toggleMenu}
                display={false}
            />

            {
                mainDisplayOn && 
                <EmailCards
                    emails={emails}
                    setReadUnreadStatus={setReadUnreadStatus}
                    setFavStatus={setFavStatus}
                />
            }
            
            
        </section>
        </>
    )
}

export default EmailApp; 