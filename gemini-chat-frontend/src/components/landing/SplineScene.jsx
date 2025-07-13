
import React from 'react';

const SplineScene = ({ style }) => {
  return (
    <div style={style}>
      <iframe src='https://my.spline.design/cubeandballs-lqJuKbugmz8ZQjbpz1saQLva/' frameborder='0' width='100%' height='100%'></iframe>
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 70%, rgba(120, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated floating elements */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(168, 85, 247, 0.1))',
          animation: 'float 6s ease-in-out infinite',
          top: '20%',
          left: '20%'
        }} />
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(192, 132, 252, 0.1))',
          animation: 'float 4s ease-in-out infinite reverse',
          bottom: '20%',
          right: '20%'
        }} />
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(168, 85, 247, 0.1))',
          animation: 'float 8s ease-in-out infinite',
          top: '60%',
          left: '70%'
        }} />
      </div>
    </div>
  );
};

export default SplineScene;
