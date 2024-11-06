import { supabase } from '../lib/supabase.js'

// 페이지 로드 시 확인용 로그
console.log('signup.js loaded')

const form = document.getElementById('signupForm')
console.log('form:', form)  // form이 제대로 선택되는지 확인

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('form submitted')  // 폼 제출 시 확인
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    console.log('입력값:', { email, password })  // 입력값 확인
    
    try {
        console.log('회원가입 시도:', { email, password })

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        
        console.log('회원가입 응답:', { data, error })
        
        if (error) {
            alert('회원가입 중 오류가 발생했습니다: ' + error.message)
            return
        }
        
        alert('회원가입이 완료되었습니다!')
        window.location.href = 'login.html'
        
    } catch (error) {
        console.error('예외 발생:', error)
        alert('오류가 발생했습니다: ' + error.message)
    }
})
