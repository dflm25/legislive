import React, { useState } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat/Chat'

const Fair = (props) => {
    
    return <div className="fair-container">
                <header>
                    
                </header>
                <main>
                    {props.children}
                </main>
                <aside>
                    <Chat />
                </aside>
                <footer>
                    
                </footer>
            </div>
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  title: state.title
});

export default connect(mapStateToProps)(Fair);