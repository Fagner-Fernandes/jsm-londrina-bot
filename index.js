const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

console.log('🚀 Iniciando Bot da JSM Londrina...');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "jsm-londrina" }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--single-process'
        ]
    }
});

client.on('qr', qr => {
    console.log('QR CODE PARA SCAN:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot conectado!');
    console.log('🤖 JSM Londrina Online');
});

client.on('message', async msg => {
    const text = msg.body.toLowerCase();
    
    // Ignorar mensagens de grupos
    if (msg.from.includes('@g.us')) return;
    
    // Saudação
    if (text.includes('oi') || text.includes('olá') || text.includes('menu')) {
        const menu = `
*🏛️ JUNTA DE SERVIÇO MILITAR - LONDRINA*

1️⃣ *ALISTAMENTO*
- Idade: 18 anos (ano de nascimento)
- Prazo: 01/01 a 30/06
- Online: alistamento.eb.mil.br

2️⃣ *DOCUMENTOS*
- RG original
- CPF
- Certidão de Nascimento
- Comprovante residência

3️⃣ *ENDEREÇO JSM*
Av. Dez de Dezembro, 1830
Loja 44 - Helena, Londrina/PR
Horário: 8h às 16h (seg-sex)

4️⃣ *CONTATO*
Email: jsm091.londrina@gmail.com

Digite o número da opção (1, 2, 3, 4)`;
        
        await msg.reply(menu);
    }
    
    // Opção 1
    if (text === '1') {
        await msg.reply(`*📝 ALISTAMENTO MILITAR*

• *IDADE:* 18 anos (ano corrente)
• *PRAZO:* 1º de janeiro a 30 de junho
• *ONLINE:* https://alistamento.eb.mil.br
• *MULTAS:* Após 30/06, multa diária

📍 *Compareça à JSM com documentos originais*`);
    }
    
    // Opção 2
    if (text === '2') {
        await msg.reply(`*📄 DOCUMENTOS NECESSÁRIOS*

1. *RG ORIGINAL* (não aceita cópia)
2. *CPF*
3. *Certidão de Nascimento*
4. *Comprovante de Residência*
   - Conta de luz/água
   - Últimos 3 meses

⚠️ Trazer cópias também`);
    }
    
    // Opção 3
    if (text === '3') {
        await msg.reply(`*📍 JSM LONDRINA*

*ENDEREÇO:*
Av. Dez de Dezembro, 1830
Loja 44 - Helena
Londrina/PR

*HORÁRIO:*
Segunda a Sexta
8h às 16h

*COMO CHEGAR:*
• Ônibus para o Helena
• Próximo ao Extra Helena

*CONTATO:*
jsm091.londrina@gmail.com`);
    }
    
    // Opção 4
    if (text === '4') {
        await msg.reply(`*📞 CONTATO JSM LONDRINA*

*E-MAIL:*
jsm091.londrina@gmail.com

*ATENDIMENTO PRESENCIAL:*
Segunda a Sexta
8h às 16h

*ENDEREÇO:*
Av. Dez de Dezembro, 1830
Loja 44 - Helena, Londrina

*SITE EXÉRCITO:*
alistamento.eb.mil.br`);
    }
});

client.initialize();
