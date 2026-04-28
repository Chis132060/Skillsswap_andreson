import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ProfileSetup from './components/ProfileSetup';
import HomeScreen from './components/HomeScreen';
import BrowseSkills from './components/BrowseSkills';
import TutorProfile from './components/TutorProfile';
import BookSession from './components/BookSession';
import PaymentScreen from './components/PaymentScreen';
import SessionScreen from './components/SessionScreen';
import RateReview from './components/RateReview';
import EarningsDashboard from './components/EarningsDashboard';
import WithdrawEarnings from './components/WithdrawEarnings';
import ProfileSettings from './components/ProfileSettings';
import ChatScreen from './components/ChatScreen';
import BookingsScreen from './components/BookingsScreen';
import ProposeSwap from './components/ProposeSwap';
import SuccessScreen from './components/SuccessScreen';
import NotificationsScreen from './components/NotificationsScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/browse" element={<BrowseSkills />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/book/:id" element={<BookSession />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/session" element={<SessionScreen />} />
          <Route path="/rate" element={<RateReview />} />
          <Route path="/earnings" element={<EarningsDashboard />} />
          <Route path="/withdraw" element={<WithdrawEarnings />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/bookings" element={<BookingsScreen />} />
          <Route path="/propose-swap/:id" element={<ProposeSwap />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
