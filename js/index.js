import { supabase } from '../lib/supabase.js'

// 로그아웃 기능 구현
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const { error } = await supabase.auth.signOut()
        
        if (error) {
            alert('로그아웃 중 오류가 발생했습니다')
            return
        }

        // 로그아웃 성공 시 로그인 페이지로 이동
        window.location.href = 'login.html'
        
    } catch (error) {
        alert('오류가 발생했습니다')
    }
})
