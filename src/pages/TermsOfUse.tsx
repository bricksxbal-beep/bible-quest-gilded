import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  pt: {
    title: "Termos de Uso",
    lastUpdated: "Última atualização: Fevereiro 2026",
    sections: [
      {
        heading: "1. Aceitação dos Termos",
        body: "Ao utilizar o Bible Quiz Pro, você concorda com estes Termos de Uso. Se não concordar, por favor, não utilize o aplicativo."
      },
      {
        heading: "2. Descrição do Serviço",
        body: "O Bible Quiz Pro é um aplicativo educativo de quiz bíblico que oferece perguntas e respostas sobre a Bíblia Sagrada, com sistema de gamificação, pontuação e progressão de níveis."
      },
      {
        heading: "3. Uso Permitido",
        body: "Você pode usar o aplicativo para fins pessoais e educacionais. É proibido: (a) modificar, copiar ou distribuir o conteúdo; (b) usar o app para fins comerciais sem autorização; (c) tentar acessar sistemas não autorizados."
      },
      {
        heading: "4. Conta e Dados",
        body: "Seus dados de progresso são armazenados localmente no dispositivo. Não coletamos informações pessoais identificáveis. Ao resetar o progresso, todos os dados locais serão permanentemente apagados."
      },
      {
        heading: "5. Conteúdo Bíblico",
        body: "As perguntas, explicações e referências bíblicas são fornecidas com fins educativos. Embora nos esforcemos para manter a precisão, recomendamos sempre consultar a Bíblia Sagrada como fonte primária."
      },
      {
        heading: "6. Propriedade Intelectual",
        body: "Todo o conteúdo, design, logotipos e funcionalidades do Bible Quiz Pro são protegidos por direitos autorais e pertencem aos seus respectivos proprietários."
      },
      {
        heading: "7. Isenção de Garantias",
        body: "O aplicativo é fornecido \"como está\", sem garantias de qualquer tipo. Não garantimos que o serviço será ininterrupto ou livre de erros."
      },
      {
        heading: "8. Alterações nos Termos",
        body: "Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através do aplicativo."
      },
      {
        heading: "9. Contato",
        body: "Para dúvidas sobre estes termos, entre em contato conosco através das configurações do aplicativo."
      }
    ]
  },
  en: {
    title: "Terms of Use",
    lastUpdated: "Last updated: February 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By using Bible Quiz Pro, you agree to these Terms of Use. If you do not agree, please do not use the application."
      },
      {
        heading: "2. Service Description",
        body: "Bible Quiz Pro is an educational Bible quiz app that offers questions and answers about the Holy Bible, with gamification, scoring, and level progression systems."
      },
      {
        heading: "3. Permitted Use",
        body: "You may use the app for personal and educational purposes. It is prohibited to: (a) modify, copy, or distribute the content; (b) use the app for commercial purposes without authorization; (c) attempt to access unauthorized systems."
      },
      {
        heading: "4. Account and Data",
        body: "Your progress data is stored locally on your device. We do not collect personally identifiable information. When you reset your progress, all local data will be permanently deleted."
      },
      {
        heading: "5. Biblical Content",
        body: "Questions, explanations, and biblical references are provided for educational purposes. While we strive for accuracy, we always recommend consulting the Holy Bible as the primary source."
      },
      {
        heading: "6. Intellectual Property",
        body: "All content, design, logos, and features of Bible Quiz Pro are protected by copyright and belong to their respective owners."
      },
      {
        heading: "7. Disclaimer of Warranties",
        body: "The application is provided \"as is\", without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free."
      },
      {
        heading: "8. Changes to Terms",
        body: "We reserve the right to modify these terms at any time. Significant changes will be communicated through the application."
      },
      {
        heading: "9. Contact",
        body: "For questions about these terms, please contact us through the app settings."
      }
    ]
  },
  es: {
    title: "Términos de Uso",
    lastUpdated: "Última actualización: Febrero 2026",
    sections: [
      {
        heading: "1. Aceptación de los Términos",
        body: "Al utilizar Bible Quiz Pro, acepta estos Términos de Uso. Si no está de acuerdo, por favor no utilice la aplicación."
      },
      {
        heading: "2. Descripción del Servicio",
        body: "Bible Quiz Pro es una aplicación educativa de quiz bíblico que ofrece preguntas y respuestas sobre la Sagrada Biblia, con sistema de gamificación, puntuación y progresión de niveles."
      },
      {
        heading: "3. Uso Permitido",
        body: "Puede usar la aplicación con fines personales y educativos. Está prohibido: (a) modificar, copiar o distribuir el contenido; (b) usar la app con fines comerciales sin autorización; (c) intentar acceder a sistemas no autorizados."
      },
      {
        heading: "4. Cuenta y Datos",
        body: "Sus datos de progreso se almacenan localmente en el dispositivo. No recopilamos información personal identificable. Al resetear el progreso, todos los datos locales se eliminarán permanentemente."
      },
      {
        heading: "5. Contenido Bíblico",
        body: "Las preguntas, explicaciones y referencias bíblicas se proporcionan con fines educativos. Aunque nos esforzamos por mantener la precisión, recomendamos siempre consultar la Sagrada Biblia como fuente primaria."
      },
      {
        heading: "6. Propiedad Intelectual",
        body: "Todo el contenido, diseño, logotipos y funcionalidades de Bible Quiz Pro están protegidos por derechos de autor y pertenecen a sus respectivos propietarios."
      },
      {
        heading: "7. Exención de Garantías",
        body: "La aplicación se proporciona \"tal cual\", sin garantías de ningún tipo. No garantizamos que el servicio sea ininterrumpido o libre de errores."
      },
      {
        heading: "8. Cambios en los Términos",
        body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos se comunicarán a través de la aplicación."
      },
      {
        heading: "9. Contacto",
        body: "Para preguntas sobre estos términos, contáctenos a través de la configuración de la aplicación."
      }
    ]
  }
};

export default function TermsOfUse() {
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
        <FileText className="w-6 h-6 text-gold" />
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
