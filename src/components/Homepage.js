
import PasteBuilder from "./PasteBuilder";
import RecentPastes from "./RecentPastes";
import "../Styles/Homepage.css";


function Homepage() {
    return (


        <div id='home'>

            <div id='first'>
                <RecentPastes />
            </div>

            <div id='search'>
                <PasteBuilder />
            </div>
            <div id='recent'>

            </div>
        </div>









    )
}
export default Homepage;