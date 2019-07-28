var express = require('express');
var router = express.Router();

router.get('/rightclick', (req, res) => {
  return `
            <html>
                <h1>Вы все сделали правильно! Ссылка безопасна!</h1>
            </html>
        
        `;
});

router.get('/wrongclick', (req, res) => {
  return `
            <html>
                <h1>Вы только что перешли по вредоносной ссылке!</h1>
            </html>
        
        `;
});

module.exports = router;
