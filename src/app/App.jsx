import "../styles/globals.css";
import Header from "@/components/header/Header.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "@/pages/dashboard/DashboardPage.jsx";
import LibraryPage from "@/pages/library/LibraryPage.jsx";
import ProfilePage from "@/pages/profile/ProfilePage.jsx";
import FamilyPage from "@/pages/family/FamilyPage.jsx";
import {ErrorProvider} from "@/contexts/ErrorContext.jsx";

function AchievementPage() {
    return <div className="container"><h2>Osiągnięcia (TODO)</h2></div>;
}

export default function App() {
    return (
        <ErrorProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/library" element={<LibraryPage/>}/>
                <Route path="/achievement" element={<AchievementPage/>}/>
                <Route path="/family" element={<FamilyPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </ErrorProvider>
    );
}