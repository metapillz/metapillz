console.log('login.js 로드됨');

import { supabase } from '../lib/supabase.js'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        
        
        
        if (error) {
            alert('로그인 실패: ' + error.message)
            return
        }

        localStorage.setItem('user', JSON.stringify({
            email: email,
            isLoggedIn: true
        }));

        window.location.href = '../pages/index.html'

        
    } catch (error) {
        alert('오류가 발생했습니다: ' + error.message)
    }
    
})

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
    
    const kakaoLoginBtn = document.getElementById('kakao-login');
    console.log('카카오 버튼 엘리먼트:', kakaoLoginBtn);
    
    if (kakaoLoginBtn) {
        kakaoLoginBtn.addEventListener('click', async () => {
            console.log('카카오 로그인 버튼 클릭됨');
            
            try {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: 'kakao',
                    options: {
                        redirectTo: `${window.location.origin}/pages/index.html`
                    }
                })
                
                console.log('Supabase 응답:', data);
                
                if (error) throw error
                
            } catch (error) {
                console.error('카카오 로그인 오류:', error)
                alert('로그인 중 오류가 발생했습니다.')
            }
        })
    } else {
        console.error('카카오 로그인 버튼을 찾을 수 없습니다.')
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

