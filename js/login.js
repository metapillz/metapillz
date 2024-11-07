console.log('login.js 로드됨');

import { supabase } from '../lib/supabase.js'

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // 로그인 로직 처리
    // 로그인 성공 시 리디렉션
    window.location.href = '/auth/callback';
});

document.getElementById('google-login')?.addEventListener('click', async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/pages/index.html`  // 이메일 로그인과 동일한 경로로 리다이렉트
            }
        })
        
        if (error) throw error
        
        // 이메일 로그인과 동일한 형식으로 사용자 정보 저장
        if (data?.user) {
            localStorage.setItem('user', JSON.stringify({
                email: data.user.email,
                isLoggedIn: true
            }))
        }
        
    } catch (error) {
        console.error('Google 로그인 오류:', error.message)
        alert('로그인 중 오류가 발생했습니다.')
    }
})

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드됨');
    
    const kakaoButton = document.getElementById('kakaoLoginButton');
    if (kakaoButton) {
        kakaoButton.addEventListener('click', function() {
            // 카카오 로그인 로직
        });
    } else {
        console.error('카카오 로그인 버튼을 찾을 수 없습니다.');
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
        localStorage.setItem('user', JSON.stringify({
            email: session.user.email,
            isLoggedIn: true
        }))
    }
})

// Google 로그인 성공 시 호출되는 함수
function onGoogleSignIn(googleUser) {
    // 사용자 정보를 가져옵니다.
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // 로그인 성공 후 리디렉션
    window.location.href = '/auth/callback';
}

