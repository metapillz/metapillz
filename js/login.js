console.log('login.js 로드됨');

import { supabase } from '../lib/supabase.js';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // 로그인 로직 처리
    window.location.href = '/auth/callback';
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드됨');
});

// 세션 확인
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        localStorage.setItem('user', JSON.stringify({
            email: session.user.email,
            isLoggedIn: true
        }));
    }
});

