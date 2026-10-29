import React, { useState } from 'react';
import './App.css';

const ALL_CARS = [
  { id: 1, name: 'Chevrolet Malibu 2 XL', type: 'Sedan', price: '$50', rating: 4.9, year: 2023, fuel: 'Benzin', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', featured: true },
  { id: 2, name: 'Kia K5 GT-Line', type: 'Sedan', price: '$65', rating: 4.8, year: 2024, fuel: 'Benzin', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80', featured: true },
  { id: 3, name: 'Hyundai Tucson Ultimate', type: 'SUV', price: '$75', rating: 4.9, year: 2023, fuel: 'Gibrid', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80', featured: true },
  { id: 4, name: 'Chevrolet Tracker Premier', type: 'SUV', price: '$45', rating: 4.6, year: 2023, fuel: 'Benzin', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', featured: false },
  { id: 5, name: 'BMW M5 F90 Competition', type: 'Luks', price: '$220', rating: 5.0, year: 2023, fuel: 'Benzin', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80', featured: true },
  { id: 6, name: 'Mercedes-Benz G-Class AMG', type: 'Luks', price: '$350', rating: 5.0, year: 2024, fuel: 'Benzin', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=600&q=80', featured: true },
  { id: 7, name: 'BYD Song Plus EV', type: 'Elektro', price: '$60', rating: 4.8, year: 2024, fuel: 'Elektr', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', featured: false },
  { id: 8, name: 'Tesla Model Y Long Range', type: 'Elektro', price: '$110', rating: 4.9, year: 2023, fuel: 'Elektr', seats: '5 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80', featured: false },
  { id: 9, name: 'Chevrolet Tahoe High Country', type: 'SUV', price: '$180', rating: 4.9, year: 2023, fuel: 'Benzin', seats: '7 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80', featured: false },
  { id: 10, name: 'Porsche Panamera GTS', type: 'Luks', price: '$280', rating: 5.0, year: 2024, fuel: 'Benzin', seats: '4 o\'rin', trans: 'Avtomat', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80', featured: true }
];

const REVIEWS_DATA = [
  { id: 1, name: 'Javohir Toshmatov', rating: 5, date: '12-Aprel, 2026', comment: 'Malibu 2 oldim, xizmat ko\'rsatish juda yuqori darajada. Mashina ideal holatda edi!', car: 'Chevrolet Malibu 2 XL' },
  { id: 2, name: 'Sardor Rahimov', rating: 5, date: '01-May, 2026', comment: 'BMW M5ni to'y uchun ijara oldik. Hamma hayratda qoldi. Rahmat AutoDrive jamoasiga!', car: 'BMW M5 F90' },
  { id: 3, name: 'Madina Umarova', rating: 4, date: '18-May, 2026', comment: 'BYD Song Plus juda tejamkor ekan. Shahar bo\'ylab yurishga juda qulay mashina.', car: 'BYD Song Plus EV' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [filterType, setFilterType] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    startDate: '',
    days: 1,
    pasport: ''
  });

  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5, car: 'Chevrolet Malibu 2 XL' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.startDate) {
      showToast('⚠️ Iltimos, barcha maydonlarni to\'ldiring!');
      return;
    }

    const priceNumber = parseInt(selectedCar.price.replace('$', ''));
    const totalPrice = priceNumber * formData.days;

    const newBooking = {
      id: Date.now(),
      car: selectedCar,
      ...formData,
      totalPrice,
      status: 'Tasdiqlandi'
    };

    setBookings([newBooking, ...bookings]);
    setSelectedCar(null);
    setFormData({ fullName: '', phone: '', startDate: '', days: 1, pasport: '' });
    showToast('🎉 Buyurtmangiz muvaffaqiyatli qabul qilindi!');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const reviewObj = {
      id: Date.now(),
      ...newReview,
      date: 'Bugun'
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview({ name: '', comment: '', rating: 5, car: 'Chevrolet Malibu 2 XL' });
    showToast('✨ Sharhingiz saqlandi!');
  };

  const filteredCars = ALL_CARS.filter(car => {
    const matchesType = filterType === 'Barchasi' || car.type === filterType;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="app-main">
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      <header className="header-nav">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <span>🚗</span> AutoDrive Lux
        </div>
        <nav className="nav-links">
          <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>Bosh sahifa</button>
          <button className={currentPage === 'cars' ? 'active' : ''} onClick={() => setCurrentPage('cars')}>Avtopark</button>
          <button className={currentPage === 'my-bookings' ? 'active' : ''} onClick={() => setCurrentPage('my-bookings')}>
            Mening buyurtmalarim {bookings.length > 0 && <span className="badge">{bookings.length}</span>}
          </button>
          <button className={currentPage === 'reviews' ? 'active' : ''} onClick={() => setCurrentPage('reviews')}>Sharhlar</button>
          <button className={currentPage === 'about' ? 'active' : ''} onClick={() => setCurrentPage('about')}>Biz haqimizda</button>
        </nav>
        <button className="cta-btn" onClick={() => setCurrentPage('cars')}>Mashina tanlash</button>
      </header>

      {currentPage === 'home' && (
        <section className="hero-section">
          <div className="hero-content">
            <h1>Premium Avtomobillar Ijarasi Toshkentda</h1>
            <p>Eng so'nggi rusumdagi qulay va xavfsiz avtomobillar. Rasmiylashtirish 5 daqiqada!</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setCurrentPage('cars')}>Avtoparkni ko'rish</button>
              <button className="btn-secondary" onClick={() => setCurrentPage('about')}>Batafsil ma'lumot</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card"><h3>150+</h3><p>Avtomobillar</p></div>
            <div className="stat-card"><h3>2,400+</h3><p>Mamnun mijozlar</p></div>
            <div className="stat-card"><h3>24/7</h3><p>Qo'llab-quvvatlash</p></div>
          </div>
        </section>
      )}

      {(currentPage === 'home' || currentPage === 'cars') && (
        <section className="cars-section">
          <div className="section-title">
            <h2>Avtomobillar Katalogi</h2>
            <p>O'zingizga mos bo'lgan toifadagi avtomobilni tanlang</p>
          </div>

          <div className="filter-bar">
            <input 
              type="text" 
              placeholder="🔍 Avtomobil nomini qidirish..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="type-buttons">
              {['Barchasi', 'Sedan', 'SUV', 'Luks', 'Elektro'].map(t => (
                <button 
                  key={t} 
                  className={filterType === t ? 'active' : ''} 
                  onClick={() => setFilterType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="cars-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <div className="card-image-wrap">
                  <img src={car.img} alt={car.name} />
                  <span className="car-tag">{car.type}</span>
                </div>
                <div className="card-body">
                  <div className="card-header">
                    <h3>{car.name}</h3>
                    <span className="rating">⭐ {car.rating}</span>
                  </div>
                  <div className="specs">
                    <span>📅 {car.year}</span>
                    <span>⚡ {car.fuel}</span>
                    <span>💺 {car.seats}</span>
                    <span>⚙️ {car.trans}</span>
                  </div>
                  <div className="card-footer">
                    <div className="price-tag">
                      <span className="amount">{car.price}</span>
                      <span className="period">/kun</span>
                    </div>
                    <button className="book-now-btn" onClick={() => setSelectedCar(car)}>Ijara olish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'my-bookings' && (
        <section className="bookings-section">
          <h2>Mening Buyurtmalarim</h2>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <p>Sizda hali faol buyurtmalar yo'q.</p>
              <button onClick={() => setCurrentPage('cars')}>Birinchi mashinani tanlang</button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(item => (
                <div key={item.id} className="booking-card">
                  <img src={item.car.img} alt={item.car.name} />
                  <div className="booking-details">
                    <h3>{item.car.name}</h3>
                    <p><strong>Mijoz:</strong> {item.fullName}</p>
                    <p><strong>Tel:</strong> {item.phone}</p>
                    <p><strong>Boshlanish sanasi:</strong> {item.startDate}</p>
                    <p><strong>Muddati:</strong> {item.days} kun</p>
                    <p className="total"><strong>Jami summasi:</strong> ${item.totalPrice}</p>
                  </div>
                  <div className="booking-status">
                    <span className="status-badge">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {currentPage === 'reviews' && (
        <section className="reviews-section">
          <h2>Mijozlarimiz Sharhlari</h2>
          <div className="reviews-grid">
            {reviews.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <strong>{r.name}</strong>
                  <span>{'⭐'.repeat(r.rating)}</span>
                </div>
                <small className="car-used">Mashina: {r.car}</small>
                <p>"{r.comment}"</p>
                <small className="review-date">{r.date}</small>
              </div>
            ))}
          </div>

          <div className="add-review-box">
            <h3>Fikr qoldirish</h3>
            <form onSubmit={handleReviewSubmit}>
              <input 
                type="text" 
                placeholder="Ismingiz" 
                value={newReview.name} 
                onChange={(e) => setNewReview({...newReview, name: e.target.value})} 
                required 
              />
              <textarea 
                placeholder="Xizmat haqida fikringiz..." 
                value={newReview.comment} 
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})} 
                required
              ></textarea>
              <button type="submit">Sharhni yuborish</button>
            </form>
          </div>
        </section>
      )}

      {currentPage === 'about' && (
        <section className="about-section">
          <h2>AutoDrive Lux Haqida</h2>
          <p>Biz 2020-yildan beri O'zbekiston bo'ylab oliy darajadagi avtomobillar ijarasini taqdim etib kelmoqdamiz.</p>
          <div className="about-grid">
            <div className="about-box">
              <h3>🚀 Tezkor rasmiylashtirish</h3>
              <p>Hujjatlar bor yo'g'i 5 daqiqada tayyorlanadi. Ortiqcha ovoragarchiliksiz.</p>
            </div>
            <div className="about-box">
              <h3>🛡️ To'liq sug'urta</h3>
              <p>Barcha avtomobillarimiz KASKO va OSGO sug'urtasiga ega.</p>
            </div>
            <div className="about-box">
              <h3>🧼 Mukammal tozalik</h3>
              <p>Har bir buyurtmadan oldin ximchistka va dezinfeksiya qilinadi.</p>
            </div>
          </div>
        </section>
      )}

      {selectedCar && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedCar(null)}>✕</button>
            <h2>{selectedCar.name} - Ijara Rasmiylashtirish</h2>
            <form onSubmit={handleBookSubmit}>
              <div className="form-group">
                <label>To'liq ismingiz</label>
                <input 
                  type="text" 
                  placeholder="Ism Familiya" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Telefon raqamingiz</label>
                <input 
                  type="tel" 
                  placeholder="+998 90 123 45 67" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Pasport / ID seriya va raqam</label>
                <input 
                  type="text" 
                  placeholder="AA 1234567" 
                  value={formData.pasport}
                  onChange={(e) => setFormData({...formData, pasport: e.target.value})}
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Olish sanasi</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Kunlar soni</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30" 
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: parseInt(e.target.value) || 1})}
                    required 
                  />
                </div>
              </div>

              <div className="price-summary">
                <p>Bir kunlik: {selectedCar.price}</p>
                <h3>Jami: ${parseInt(selectedCar.price.replace('$', '')) * (formData.days || 1)}</h3>
              </div>

              <button type="submit" className="submit-booking-btn">Buyurtmani Tasdiqlash</button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 AutoDrive Lux. Barcha huquqlar hamkorlikda ximoyalangan.</p>
        <p>Telefon: +998 71 200 00 00 | Manzil: Toshkent sh., Chilonzor tumani</p>
      </footer>
    </div>
  );
}