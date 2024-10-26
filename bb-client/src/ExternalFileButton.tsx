import React from 'react';

const ExternalFileButton = () => {
    return (
        <div>
            <h2>Access Files on VM</h2>
            <button onClick={() => window.location.href = 'http://rpi1.gr9.codexenmo.no'}>
                Go to Raspberry Pi
            </button>
            <a href="http://your-vm-domain.com/files/filename.txt" target="_blank" rel="noopener noreferrer">
                Open File on VM
            </a>
        </div>
    );
};

export default ExternalFileButton;