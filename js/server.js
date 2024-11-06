const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// HTML 페이지 라우팅 추가
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

// 모든 HTML 요청 처리
app.get('*.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages', req.path));
});

// 임시 사용자 데이터 (실제로는 데이터베이스를 사용해야 함)
const users = [
    {
        email: 'iris35137@gmail.com',
        password: '1234' // 실제로는 해시된 비밀번호를 저장해야 함
    }
];

// 로그인 API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // 사용자 확인
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ 
            status: "success",
            message: "로그인 성공"
        });
    } else {
        res.status(401).json({ 
            status: "fail",
            message: "이메일 또는 비밀번호가 올바르지 않습니다."
        });
    }
});

// 결제 검증 API
app.post('/api/payments/verify', async (req, res) => {
    try {
        const { imp_uid, merchant_uid, amount } = req.body;
        
        // 포트원 액세스 토큰 발급
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "3512436732173016",
                imp_secret: "fEIrCXBiryTH81w1SouK2YA57SRDh4IaFt5thGpc5wgwgYh7db7k9UxO02EabYsgpHfFOAB2"
            }
        });

        const { access_token } = getToken.data.response;

        // 포트원 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: "get",
            headers: { "Authorization": access_token }
        });

        const paymentData = getPaymentData.data.response;

        // 결제 금액 검증
        if (paymentData.amount === amount) {
            // 결제 성공 처리
            res.json({ 
                status: "success", 
                message: "결제가 성공적으로 완료되었습니다."
            });
        } else {
            // 결제 금액 불일치
            res.status(400).json({ 
                status: "fail", 
                message: "결제 금액이 불일치합니다." 
            });
    con
    } catch (error) {
        console.error('결제 검증 실패:', error);
        res.status(400).json({ 
            status: "fail", 
            message: "결제 검증에 실패했습니다." 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행중입니다`);
}); 