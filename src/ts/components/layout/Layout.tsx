import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../style/Layout.css';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;