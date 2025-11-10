import "../styles/globals.css";
import Header from "@/components/Header.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "@/pages/dashboard/DashboardPage.jsx";

function LibraryPage() {
    return <div className="container"><h2>Biblioteka (TODO)</h2></div>;
}

function AchievementPage() {
    return <div className="container"><h2>Osiągnięcia (TODO)</h2></div>;
}

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/library" element={<LibraryPage/>}/>
                <Route path="/achievement" element={<AchievementPage/>}/>
            </Routes>
        </>
    );
}
