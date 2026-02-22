import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  pt: {
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: Fevereiro 2026",
    sections: [
      {
        heading: "1. Introdução",
        body: "A sua privacidade é importante para nós. Esta Política de Privacidade explica como o Bible Quiz Pro coleta, usa e protege suas informações ao utilizar nosso aplicativo."
      },
      {
        heading: "2. Dados Coletados",
        body: "O Bible Quiz Pro armazena dados exclusivamente no seu dispositivo local (localStorage). Os dados incluem: progresso do jogo, pontuação, nível, configurações de preferência (idioma, tema, som), estatísticas de desempenho por categoria e histórico de sequência (streak)."
      },
      {
        heading: "3. Dados que NÃO Coletamos",
        body: "Não coletamos: nome real, e-mail, telefone, localização, dados de pagamento, identificadores de dispositivo ou qualquer informação pessoal identificável. Não rastreamos sua atividade fora do aplicativo."
      },
      {
        heading: "4. Armazenamento Local",
        body: "Todos os dados são armazenados localmente no seu dispositivo usando localStorage do navegador. Nenhum dado é enviado para servidores externos. Você tem controle total sobre seus dados e pode apagá-los a qualquer momento através das configurações."
      },
      {
        heading: "5. Cookies e Rastreamento",
        body: "Não utilizamos cookies de rastreamento, pixels de monitoramento, analytics de terceiros ou qualquer ferramenta de rastreamento comportamental."
      },
      {
        heading: "6. Compartilhamento de Dados",
        body: "Não compartilhamos, vendemos ou transferimos seus dados para terceiros sob nenhuma circunstância, pois não temos acesso aos dados armazenados no seu dispositivo."
      },
      {
        heading: "7. Segurança",
        body: "Como os dados são armazenados localmente, a segurança depende da proteção do seu próprio dispositivo. Recomendamos manter seu dispositivo protegido com senha ou biometria."
      },
      {
        heading: "8. Direitos do Usuário",
        body: "Você tem o direito de: (a) acessar todos os seus dados através do app; (b) excluir todos os dados usando a função 'Resetar Progresso'; (c) modificar suas preferências a qualquer momento nas configurações."
      },
      {
        heading: "9. Menores de Idade",
        body: "O Bible Quiz Pro é adequado para todas as idades. Como não coletamos dados pessoais, não há riscos específicos para menores de idade. Recomendamos supervisão parental para crianças."
      },
      {
        heading: "10. Alterações nesta Política",
        body: "Podemos atualizar esta política periodicamente. Recomendamos revisá-la regularmente. Alterações significativas serão comunicadas através do aplicativo."
      },
      {
        heading: "11. Contato",
        body: "Para dúvidas ou preocupações sobre privacidade, entre em contato conosco através das configurações do aplicativo."
      }
    ]
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 2026",
    sections: [
      {
        heading: "1. Introduction",
        body: "Your privacy is important to us. This Privacy Policy explains how Bible Quiz Pro collects, uses, and protects your information when using our application."
      },
      {
        heading: "2. Data Collected",
        body: "Bible Quiz Pro stores data exclusively on your local device (localStorage). Data includes: game progress, score, level, preference settings (language, theme, sound), performance statistics by category, and streak history."
      },
      {
        heading: "3. Data We Do NOT Collect",
        body: "We do not collect: real name, email, phone, location, payment data, device identifiers, or any personally identifiable information. We do not track your activity outside the application."
      },
      {
        heading: "4. Local Storage",
        body: "All data is stored locally on your device using browser localStorage. No data is sent to external servers. You have full control over your data and can delete it at any time through settings."
      },
      {
        heading: "5. Cookies and Tracking",
        body: "We do not use tracking cookies, monitoring pixels, third-party analytics, or any behavioral tracking tools."
      },
      {
        heading: "6. Data Sharing",
        body: "We do not share, sell, or transfer your data to third parties under any circumstances, as we do not have access to data stored on your device."
      },
      {
        heading: "7. Security",
        body: "Since data is stored locally, security depends on the protection of your own device. We recommend keeping your device protected with a password or biometrics."
      },
      {
        heading: "8. User Rights",
        body: "You have the right to: (a) access all your data through the app; (b) delete all data using the 'Reset Progress' function; (c) modify your preferences at any time in settings."
      },
      {
        heading: "9. Children",
        body: "Bible Quiz Pro is suitable for all ages. Since we do not collect personal data, there are no specific risks for minors. We recommend parental supervision for children."
      },
      {
        heading: "10. Changes to this Policy",
        body: "We may update this policy periodically. We recommend reviewing it regularly. Significant changes will be communicated through the application."
      },
      {
        heading: "11. Contact",
        body: "For questions or concerns about privacy, please contact us through the app settings."
      }
    ]
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: Febrero 2026",
    sections: [
      {
        heading: "1. Introducción",
        body: "Su privacidad es importante para nosotros. Esta Política de Privacidad explica cómo Bible Quiz Pro recopila, usa y protege su información al utilizar nuestra aplicación."
      },
      {
        heading: "2. Datos Recopilados",
        body: "Bible Quiz Pro almacena datos exclusivamente en su dispositivo local (localStorage). Los datos incluyen: progreso del juego, puntuación, nivel, configuraciones de preferencia (idioma, tema, sonido), estadísticas de rendimiento por categoría e historial de racha."
      },
      {
        heading: "3. Datos que NO Recopilamos",
        body: "No recopilamos: nombre real, correo electrónico, teléfono, ubicación, datos de pago, identificadores de dispositivo ni ninguna información personal identificable. No rastreamos su actividad fuera de la aplicación."
      },
      {
        heading: "4. Almacenamiento Local",
        body: "Todos los datos se almacenan localmente en su dispositivo usando localStorage del navegador. Ningún dato se envía a servidores externos. Usted tiene control total sobre sus datos y puede eliminarlos en cualquier momento a través de la configuración."
      },
      {
        heading: "5. Cookies y Rastreo",
        body: "No utilizamos cookies de rastreo, píxeles de monitoreo, analíticas de terceros ni ninguna herramienta de rastreo comportamental."
      },
      {
        heading: "6. Compartir Datos",
        body: "No compartimos, vendemos ni transferimos sus datos a terceros bajo ninguna circunstancia, ya que no tenemos acceso a los datos almacenados en su dispositivo."
      },
      {
        heading: "7. Seguridad",
        body: "Como los datos se almacenan localmente, la seguridad depende de la protección de su propio dispositivo. Recomendamos mantener su dispositivo protegido con contraseña o biometría."
      },
      {
        heading: "8. Derechos del Usuario",
        body: "Usted tiene derecho a: (a) acceder a todos sus datos a través de la app; (b) eliminar todos los datos usando la función 'Resetear Progreso'; (c) modificar sus preferencias en cualquier momento en la configuración."
      },
      {
        heading: "9. Menores de Edad",
        body: "Bible Quiz Pro es adecuado para todas las edades. Como no recopilamos datos personales, no hay riesgos específicos para menores. Recomendamos supervisión parental para niños."
      },
      {
        heading: "10. Cambios en esta Política",
        body: "Podemos actualizar esta política periódicamente. Recomendamos revisarla regularmente. Los cambios significativos se comunicarán a través de la aplicación."
      },
      {
        heading: "11. Contacto",
        body: "Para preguntas o inquietudes sobre privacidad, contáctenos a través de la configuración de la aplicación."
      }
    ]
  }
};

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const c = content[language];

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button onClick={() => navigate("/settings")} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">{language === "pt" ? "Voltar" : language === "es" ? "Volver" : "Back"}</span>
      </button>

      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-6 h-6 text-gold" />
        <h1 className="font-serif text-2xl font-bold">{c.title}</h1>
      </div>
      <p className="text-xs text-muted-foreground mb-6">{c.lastUpdated}</p>

      <div className="space-y-5">
        {c.sections.map((section, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <h2 className="font-semibold text-sm mb-2">{section.heading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
