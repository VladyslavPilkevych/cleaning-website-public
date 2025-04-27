const express = require('express')
const supabase = require('../supabaseClient')

const router = express.Router()

router.post('/submit-pricing-form', async (req, res) => {
  try {
    const formData = req.body.params.formData;
    console.log("Received body:", formData); 

    const { data, error } = await supabase
      .from('pricing_page_form_data')
      .insert([formData]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true, entry: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pricing-orders-table', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pricing_page_form_data')
      .select('*');
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
