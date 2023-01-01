import React from 'react';
import '../homepage/assets/css/style.css';

function Index() {
    return(
        <div>
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-phone d-flex align-items-center"><span>+1 5589 55488 55</span></i>
                        <i className="bi bi-clock d-flex align-items-center ms-4"><span> Mon-Sat: 11AM - 23PM</span></i>
                    </div>
                </div>
            </div>
            <header id="header" className="fixed-top d-flex align-items-cente">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                    <div className='dis'>
                        <h3 className="logo me-auto me-lg-0"><a href="index.html"><img src={
                                    require('./assets/img/logo/logo.png') } alt=""></img>
                            </a>
                        </h3>
                        <div><span className='res'> Restaurent</span>
                            <span className='company_name'>FOOD</span> </div>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0 nav-menu2">
                        <ul>
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <li><a className="nav-link scrollto" href="#menu">Menu</a></li>
                            <li><a className="nav-link scrollto" href="#specials">Specials</a></li>
                            <li><a className="nav-link scrollto" href="#events">Events</a></li>
                            <li><a className="nav-link scrollto" href="#chefs">Chefs</a></li>
                            <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li>
                            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    <a href="#book-a-table" className="book-a-table-btn scrollto d-none d-lg-flex">Book a table</a>
                </div>
            </header>
            <section id="hero" className="d-flex align-items-center">
                <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-8 writing-style">
                            <h1>Welcome to <span>Restaurant</span></h1>
                            <h2>Delivering great food for more than 18 years!</h2>
                            <div className="btns">
                                <a href="#menu" className="btn-menu animated fadeInUp scrollto">Our Menu</a>
                                <a href="#book-a-table" className="btn-book animated fadeInUp scrollto">Book a Table</a>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative"
                            data-aos="zoom-in" data-aos-delay="200">
                            <a href="https://www.youtube.com/watch?v=u6BOC7CDUTQ" className="glightbox play-btn"></a>
                        </div>
                    </div>
                </div>
            </section>
            <main id="main">
                <section id="about" className="about">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="100">
                                <div className="about-img">
                                    <img src={require('./assets/img/about.jpg') } alt=""></img>
                                </div>
                            </div>
                            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content writing-style">
                                <h3 className='writing-style'>We provide for the most worthy food and taste, as if the pleasures
                                    of the body and mind were to be assumed.</h3>
                                <p className="fst-italic">
                                    Our moto is to provide the best food possible to our customer. and also no compromise with
                                    quality, taste
                                    and health.
                                </p>
                                <ul>
                                    <li><i className="bi bi-check-circle"></i> Best Environment.</li>
                                    <li><i className="bi bi-check-circle"></i>Best taste.</li>
                                    <li><i className="bi bi-check-circle"></i> Best chef.</li>
                                    <li><i className="bi bi-check-circle"></i> Best food.</li>
                                </ul>
                                <p>
                                    Hungry? no problem. We are here to serve you. Morning breakfast, lunch, tea, coffee, evening
                                    items and dinner.
                                    Also any kind of event like marriage anniversary, dinner party, barthday party nad many
                                    more.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="why-us" className="why-us">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Why Us</h2>
                            <p>Why Choose Our Restaurant</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="box writing-style" data-aos="zoom-in" data-aos-delay="100">
                                    <span>01</span>
                                    <h4>Best Environment</h4>
                                    <p>Nice, calm, clean, excellent orientation and many more.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-4 mt-lg-0">
                                <div className="box writing-style" data-aos="zoom-in" data-aos-delay="200">
                                    <span>02</span>
                                    <h4>Best Quality Food</h4>
                                    <p>No compromise in taste nad food quality. Better menus and world class chefs. </p>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-4 mt-lg-0">
                                <div className="box writing-style" data-aos="zoom-in" data-aos-delay="300">
                                    <span>03</span>
                                    <h4> World Class Service</h4>
                                    <p>Our staff is very user friendly. and attend each and every customer with care.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="menu" className="menu section-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>Menu</h2>
                            <p>Check Our Tasty Menu</p>
                        </div>
                        <div className="row" data-aos="fade-up" data-aos-delay="100">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <ul id="menu-flters">
                                    <li data-filter="*" className="filter-active">All</li>
                                    <li data-filter=".filter-starters">Starters</li>
                                    <li data-filter=".filter-salads">Salads</li>
                                    <li data-filter=".filter-specialty">Specialty</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row menu-container writing-style" data-aos="fade-up" data-aos-delay="200">
                            <div className="col-lg-6 menu-item filter-starters">
                                <img src={require("./assets/img/menu/lobster-bisque.jpg")} className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Lobster Bisque</a><span>$5.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-specialty">
                                <img src={require('./assets/img/menu/bread-barrel.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Bread Barrel</a><span>$6.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-starters">
                                <img src={require('./assets/img/menu/cake.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Crab Cake</a><span>$7.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    A delicate crab cake served on a toasted roll with lettuce and tartar sauce
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-salads">
                                <img src={require('./assets/img/menu/caesar.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Caesar Selections</a><span>$8.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-specialty">
                                <img src={require('./assets/img/menu/tuscan-grilled.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Tuscan Grilled</a><span>$9.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-starters">
                                <img src={require('./assets/img/menu/mozzarella.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Mozzarella Stick</a><span>$4.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-salads">
                                <img src={require('./assets/img/menu/greek-salad.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Greek Salad</a><span>$9.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    All ingredients name.
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-salads">
                                <img src={require('./assets/img/menu/spinach-salad.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Spinach Salad</a><span>$9.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette
                                </div>
                            </div>
                            <div className="col-lg-6 menu-item filter-specialty">
                                <img src={require('./assets/img/menu/lobster-bisque.jpg') } className="menu-img" alt=""></img>
                                <div className="menu-content">
                                    <a href="#">Lobster Roll</a><span>$12.95</span>
                                </div>
                                <div className="menu-ingredients">
                                    Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="specials" className="specials">
                    <div className="container writing-style" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Specials</h2>
                            <p>Check Our Specials</p>
                        </div>
                        <div className="row" data-aos="fade-up" data-aos-delay="100">
                            <div className="col-lg-3">
                                <ul className="nav nav-tabs flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link active show" data-bs-toggle="tab" href="#tab-1">Cheese Burger</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#tab-2">Chicken fry</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#tab-3">Ckicken cheese pizza</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#tab-4">Hotdog</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#tab-5">Special sandwitch</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-9 mt-4 mt-lg-0">
                                <div className="tab-content">
                                    <div className="tab-pane active show" id="tab-1">
                                        <div className="row">
                                            <div className="col-lg-8 details order-2 order-lg-1">
                                                <h3>The best food is possible to get</h3>
                                                <p className="fst-italic">Why do people love restaurants?
                                                    Restaurants are known to provide excellent social settings and you could
                                                    enjoy a wonderful meal amidst friends, family, and great ambiance. </p>
                                                <p>A restaurant is a place where people visit to eat and drink the food being
                                                    prepared on the premises and pays for the same. The food is served at the
                                                    table to have a comfortable visit for your meals. The restaurant offers a
                                                    menu with various options for your meal, to choose from.</p>
                                            </div>
                                            <div className="col-lg-4 text-center order-1 order-lg-2">
                                                <img src={require('./assets/img/specials-1.png') } alt=""
                                                    className="img-fluid"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tab-2">
                                        <div className="row">
                                            <div className="col-lg-8 details order-2 order-lg-1">
                                                <h3>Et blanditiis nemo veritatis excepturi</h3>
                                                <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente
                                                    dila parde sonata raqer a videna mareta paulona marka</p>
                                                <p>Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et
                                                    reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et
                                                    velit ipsa voluptates. Optio nesciunt eaque beatae accusamus lerode pakto
                                                    madirna desera vafle de nideran pal</p>
                                            </div>
                                            <div className="col-lg-4 text-center order-1 order-lg-2">
                                                <img src={require('./assets/img/specials-2.png') } alt=""
                                                    className="img-fluid"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tab-3">
                                        <div className="row">
                                            <div className="col-lg-8 details order-2 order-lg-1">
                                                <h3>Impedit facilis occaecati odio neque aperiam sit</h3>
                                                <p className="fst-italic">Eos voluptatibus quo. Odio similique illum id quidem
                                                    non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit
                                                    quaerat perferendis aut</p>
                                                <p>Iure officiis odit rerum. Harum sequi eum illum corrupti culpa veritatis
                                                    quisquam. Neque necessitatibus illo rerum eum ut. Commodi ipsam minima
                                                    molestiae sed laboriosam a iste odio. Earum odit nesciunt fugiat sit ullam.
                                                    Soluta et harum voluptatem optio quae</p>
                                            </div>
                                            <div className="col-lg-4 text-center order-1 order-lg-2">
                                                <img src={require('./assets/img/specials-3.png') } alt=""
                                                    className="img-fluid"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tab-4">
                                        <div className="row">
                                            <div className="col-lg-8 details order-2 order-lg-1">
                                                <h3>Fuga dolores inventore laboriosam ut est accusamus laboriosam dolore</h3>
                                                <p className="fst-italic">Totam aperiam accusamus. Repellat consequuntur iure
                                                    voluptas iure porro quis delectus</p>
                                                <p>Eaque consequuntur consequuntur libero expedita in voluptas. Nostrum ipsam
                                                    necessitatibus aliquam fugiat debitis quis velit. Eum ex maxime error in
                                                    consequatur corporis atque. Eligendi asperiores sed qui veritatis aperiam
                                                    quia a laborum inventore</p>
                                            </div>
                                            <div className="col-lg-4 text-center order-1 order-lg-2">
                                                <img src={require('./assets/img/specials-4.png') } alt=""
                                                    className="img-fluid"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tab-5">
                                        <div className="row">
                                            <div className="col-lg-8 details order-2 order-lg-1">
                                                <h3>Est eveniet ipsam sindera pad rone matrelat sando reda</h3>
                                                <p className="fst-italic">Omnis blanditiis saepe eos autem qui sunt debitis
                                                    porro quia.</p>
                                                <p>Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis
                                                    recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui
                                                    quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel</p>
                                            </div>
                                            <div className="col-lg-4 text-center order-1 order-lg-2">
                                                <img src={require('./assets/img/specials-5.png') } alt=""
                                                    className="img-fluid"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="events" className="events writing-style">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>Events</h2>
                            <p>Organize Your Events in our Restaurant</p>
                        </div>
                        <div className="events-slider swiper" data-aos="fade-up" data-aos-delay="100">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="row event-item">
                                        <div className="col-lg-6">
                                            <img src={require('./assets/img/event-birthday.jpg') } className="img-fluid"
                                                alt=""></img>
                                        </div>
                                        <div className="col-lg-6 pt-4 pt-lg-0 content">
                                            <h3>Birthday Parties</h3>
                                            <div className="price">
                                                <p><span>$189</span></p>
                                            </div>
                                            <p className="fst-italic">
                                                Birthdays are the most special day of the year for children. It is a day full of
                                                celebrations where children enjoy many fun activities, party with their friends
                                                and family, receive a lot of gifts and of course. </p>
                                            <ul>
                                                <li><i className="bi bi-check-circled"></i> Talk about your birthday and the
                                                    celebrations you have planned.</li>
                                                <li><i className="bi bi-check-circled"></i> You just imagine, We will make it
                                                    live.</li>
                                                <li><i className="bi bi-check-circled"></i> Your birthday our responsibility.
                                                </li>
                                            </ul>
                                            <p>
                                                These are all fun, and memorable moments, which children will remember for a
                                                long time. So, while writing an essay on this topic, they will indeed have a lot
                                                of ideas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="row event-item">
                                        <div className="col-lg-6">
                                            <img src={require('./assets/img/event-private.jpg') } className="img-fluid"
                                                alt=""></img>
                                        </div>
                                        <div className="col-lg-6 pt-4 pt-lg-0 content">
                                            <h3>Private Parties</h3>
                                            <div className="price">
                                                <p><span>$290</span></p>
                                            </div>
                                            <p className="fst-italic">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore
                                                magna aliqua.
                                            </p>
                                            <ul>
                                                <li><i className="bi bi-check-circled"></i> Ullamco laboris nisi ut aliquip ex
                                                    ea commodo consequat.</li>
                                                <li><i className="bi bi-check-circled"></i> Duis aute irure dolor in
                                                    reprehenderit in voluptate velit.</li>
                                                <li><i className="bi bi-check-circled"></i> Ullamco laboris nisi ut aliquip ex
                                                    ea commodo consequat.</li>
                                            </ul>
                                            <p>
                                                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="row event-item">
                                        <div className="col-lg-6">
                                            <img src={require('./assets/img/event-custom.jpg') } className="img-fluid"
                                                alt=""></img>
                                        </div>
                                        <div className="col-lg-6 pt-4 pt-lg-0 content">
                                            <h3>Custom Parties</h3>
                                            <div className="price">
                                                <p><span>$99</span></p>
                                            </div>
                                            <p className="fst-italic">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore
                                                magna aliqua.
                                            </p>
                                            <ul>
                                                <li><i className="bi bi-check-circled"></i> Ullamco laboris nisi ut aliquip ex
                                                    ea commodo consequat.</li>
                                                <li><i className="bi bi-check-circled"></i> Duis aute irure dolor in
                                                    reprehenderit in voluptate velit.</li>
                                                <li><i className="bi bi-check-circled"></i> Ullamco laboris nisi ut aliquip ex
                                                    ea commodo consequat.</li>
                                            </ul>
                                            <p>
                                                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </section>
                <section id="book-a-table" className="book-a-table">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Reservation</h2>
                            <p>Book a Table</p>
                        </div>
                        <form action="forms/book-a-table.php" method="post" role="form" className="php-email-form"
                            data-aos="fade-up" data-aos-delay="100">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                        data-rule="minlen:4" data-msg="Please enter at least 4 chars"></input>
                                    <div className="validate"></div>
                                </div>
                                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email"
                                        placeholder="Your Email" data-rule="email"
                                        data-msg="Please enter a valid email"></input>
                                    <div className="validate"></div>
                                </div>
                                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Your Phone"
                                        data-rule="minlen:4" data-msg="Please enter at least 4 chars"></input>
                                    <div className="validate"></div>
                                </div>
                                <div className="col-lg-4 col-md-6 form-group mt-3">
                                    <input type="text" name="date" className="form-control" id="date" placeholder="Date"
                                        data-rule="minlen:4" data-msg="Please enter at least 4 chars"></input>
                                    <div className="validate"></div>
                                </div>
                                <div className="col-lg-4 col-md-6 form-group mt-3">
                                    <input type="text" className="form-control" name="time" id="time" placeholder="Time"
                                        data-rule="minlen:4" data-msg="Please enter at least 4 chars"></input>
                                    <div className="validate"></div>
                                </div>
                                <div className="col-lg-4 col-md-6 form-group mt-3">
                                    <input type="number" className="form-control" name="people" id="people"
                                        placeholder="# of people" data-rule="minlen:1"
                                        data-msg="Please enter at least 1 chars"></input>
                                    <div className="validate"></div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows="5" placeholder="Message"></textarea>
                                <div className="validate"></div>
                            </div>
                            <div className="mb-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your booking request was sent. We will call back or send an Email
                                    to confirm your reservation. Thank you!</div>
                            </div>
                            <div className="text-center"><button type="submit">Book a Table</button></div>
                        </form>
                    </div>
                </section>
                <section id="testimonials" className="testimonials section-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Testimonials</h2>
                            <p>What they're saying about us</p>
                        </div>
                        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            One of the best mutton kacchi on the town.
                                            You couldn't deny their test if you are eleganter people.
                                            There mutton is very soft & spicy. The KACCHI is from Bashmati rice which is boiled
                                            well. I love their BORHANI most. It was perfect tasted.
                                            The atmosphere was cool & very Gentle. You could spend your quality time with your
                                            special one here. <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src={require('./assets/img/testimonials/testimonials-1.jpg') }
                                            className="testimonial-img" alt=""></img>
                                        <h3>Saul Goodman</h3>
                                        <h4>Ceo &amp; Founder</h4>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            I think the quantity was rice was usual and more than enough for one person. We were
                                            7 and we took 3platters which were sufficient for us.❣️ <i
                                                className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src={require("./assets/img/testimonials/testimonials-2.jpg")}
                                            className="testimonial-img" alt=""></img>
                                        <h3>Sara Wilsson</h3>
                                        <h4>Designer</h4>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Thanks to our local colleagues who brought us to this place. Authentic Bangladeshi
                                            cuisine. I am not fan of mutton but this one was made to perfection. Taste was good,
                                            meat was tender. The drink in yellow green colour is popular. A touch of saltiness
                                            and spiciness and sweet…. New experience 😀. Only cash payment. <i
                                                className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src={require("./assets/img/testimonials/testimonials-3.jpg")}
                                            className="testimonial-img" alt=""></img>
                                        <h3>Jena Karlis</h3>
                                        <h4>Store Owner</h4>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim
                                            fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem
                                            dolore labore illum veniam.
                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src={require("./assets/img/testimonials/testimonials-4.jpg")}
                                            className="testimonial-img" alt=""></img>
                                        <h3>Matt Brandon</h3>
                                        <h4>Freelancer</h4>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster
                                            veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam
                                            culpa fore nisi cillum quid.
                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src={require("./assets/img/testimonials/testimonials-5.jpg")}
                                            className="testimonial-img" alt=""></img>
                                        <h3>John Larson</h3>
                                        <h4>Entrepreneur</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </section>
                <section id="gallery" className="gallery">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Gallery</h2>
                            <p>Some photos from Our Restaurant</p>
                        </div>
                    </div>
                    <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
                        <div className="row g-0">
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-1.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-1.jpg" )}alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-2.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-2.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-3.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-3.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-4.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-4.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-5.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-5.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-6.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-6.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-7.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-7.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="gallery-item">
                                    <a href="assets/img/gallery/gallery-8.jpg" className="gallery-lightbox"
                                        data-gall="gallery-item">
                                        <img src={require("./assets/img/gallery/gallery-8.jpg")} alt=""
                                            className="img-fluid"></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="chefs" className="chefs">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Chefs</h2>
                            <p>Our Proffesional Chefs</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="member" data-aos="zoom-in" data-aos-delay="100">
                                    <img src={ require('./assets/img/chefs/chefs-1.jpg') } className="img-fluid image-size"
                                        alt=""></img>
                                    <div className="member-info">
                                        <div className="member-info-content">
                                            <h4>Walter White</h4>
                                            <span>Master Chef</span>
                                        </div>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="member" data-aos="zoom-in" data-aos-delay="200">
                                    <img src={ require('./assets/img/chefs/chefs-2.jpg')} className="img-fluid image-size"
                                        alt=""></img>
                                    <div className="member-info">
                                        <div className="member-info-content">
                                            <h4>Sarah Jhonson</h4>
                                            <span>Patissier</span>
                                        </div>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="member" data-aos="zoom-in" data-aos-delay="300">
                                    <img src={ require('./assets/img/chefs/chefs-3.jpg')} className="img-fluid image-size"
                                        alt=""></img>
                                    <div className="member-info">
                                        <div className="member-info-content">
                                            <h4>William Anderson</h4>
                                            <span>Cook</span>
                                        </div>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title writing-style">
                            <h2>Contact</h2>
                            <p>Contact Us</p>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <iframe className='map-style'
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                            frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="container" data-aos="fade-up">
                        <div className="row mt-5">
                            <div className="col-lg-4">
                                <div className="info writing-style">
                                    <div className="address">
                                        <i className="bi bi-geo-alt"></i>
                                        <h4>Location:</h4>
                                        <p>A108 Adam Street, New York, NY 535022</p>
                                    </div>
                                    <div className="open-hours">
                                        <i className="bi bi-clock"></i>
                                        <h4>Open Hours:</h4>
                                        <p>
                                            Monday-Saturday:<br></br>
                                            11:00 AM - 2300 PM
                                        </p>
                                    </div>
                                    <div className="email">
                                        <i className="bi bi-envelope"></i>
                                        <h4>Email:</h4>
                                        <p>info@example.com</p>
                                    </div>
                                    <div className="phone">
                                        <i className="bi bi-phone"></i>
                                        <h4>Call:</h4>
                                        <p>+1 5589 55488 55s</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mt-5 mt-lg-0">
                                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <input type="text" name="name" className="form-control" id="name"
                                                placeholder="Your Name" required></input>
                                        </div>
                                        <div className="col-md-6 form-group mt-3 mt-md-0">
                                            <input type="email" className="form-control" name="email" id="email"
                                                placeholder="Your Email" required></input>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="subject" id="subject"
                                            placeholder="Subject" required></input>
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea className="form-control" name="message" rows="8" placeholder="Message"
                                            required></textarea>
                                    </div>
                                    <div className="my-3">
                                        <div className="loading">Loading</div>
                                        <div className="error-message"></div>
                                        <div className="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div className="text-center"><button type="submit">Send Message</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div id="footer">
                <div className="footer-top writing-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-info">
                                    <h3>Restaurantly</h3>
                                    <p>
                                        A108 Adam Street <br></br>
                                        NY 535022, USA<br></br><br></br>
                                        <strong>Phone:</strong> +1 5589 55488 55<br></br>
                                        <strong>Email:</strong> info@example.com<br></br>
                                    </p>
                                    <div className="social-links mt-3">
                                        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                        <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
                                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Morning Breakfast</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Lunch</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Snaks</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Dinnar</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Booking/Reservations</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-6 footer-newsletter">
                                <h4>Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <form action="" method="post">
                                    <input type="email" name="email"></input>
                                    <input type="submit" value="Subscribe"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Restaurantly</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;