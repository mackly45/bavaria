import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#050505',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#FFFFFF'
                }}
            >
                BAVARIA
            </motion.div>
        </motion.div>
    );
};

export default Loader;
