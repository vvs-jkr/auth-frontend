'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { verificationService } from '@/features/auth/services'; // Обновите путь
import { toast } from 'sonner';

const ConfirmEmailPage = () => { 
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search); 
  const token = searchParams.get('token'); 

  useEffect(() => {
    if (token && typeof token === 'string') {
      const confirmEmail = async () => {
        try {
          await verificationService.newVerification(token);
          toast.success('Email успешно подтвержден!');
          router.push('/auth/login');
        } catch (error: any) {
          toast.error(`Ошибка подтверждения email: ${error.response?.data?.message || 'Неизвестная ошибка'}`);
          router.push('/auth/register');
        }
      };

      confirmEmail();
    }
  }, [token, router]);

  return (
    <div>
      <h1>Подтверждение email...</h1>
      <p>Пожалуйста, подождите...</p>
    </div>
  );
};

export default ConfirmEmailPage; 