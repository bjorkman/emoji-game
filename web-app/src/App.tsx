import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import GameRoute from './screens/GameRoute';
import Friends from './screens/Friends';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/:gameId" element={<GameRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
