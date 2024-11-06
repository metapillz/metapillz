const IMP = window.IMP;
IMP.init('imp60245316'); // 본인의 고객사 식별코드

class Payment {
    constructor() {
        this.IMP = window.IMP;
        this.IMP.init('imp60245316'); // 포트원 가맹점 식별코드
    }

    async requestPay(courseInfo) {
        try {
            const response = await new Promise((resolve, reject) => {
                this.IMP.request_pay({
                    pg: 'html5_inicis',
                    pay_method: 'card',
                    merchant_uid: `order_${new Date().getTime()}`,
                    name: courseInfo.name,
                    amount: courseInfo.price,
                    buyer_name: courseInfo.buyerName,
                    buyer_tel: courseInfo.buyerTel,
                    buyer_email: courseInfo.buyerEmail
                }, function(rsp) {
                    if (rsp.success) {
                        resolve(rsp);
                    } else {
                        reject(new Error(rsp.error_msg));
                    }
                });
            });

            // 결제 성공 시 서버 검증 요청
            const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imp_uid: response.imp_uid,
                    merchant_uid: response.merchant_uid,
                    amount: courseInfo.price
                })
            });

            if (!verifyResponse.ok) {
                throw new Error('결제 검증 실패');
            }

            return {
                success: true,
                data: response
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// payment.html에서 사용할 수 있도록 전역으로 내보내기
window.Payment = Payment; 