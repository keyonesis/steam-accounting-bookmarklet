/*jQuery(document).ready(function(){*/
  if (/^https\:\/\/store\.steampowered\.com\/accoun.+/.test(location.href)) {
    var currencies = [];
    var totals={'debits':[], 'credits':[], 'wallet':[], 'debitsCount':0, 'creditsCount':0, 'cdkeyCount':0};
    
    jQuery.each(['store','ingame','market'], function( index, value ){
      var debits={'transactions':[], 'currencySum':[]};
      var credits={'transactions':[], 'currencySum':[]};

      /* initialize currencySum */
      jQuery(currencies).each(function(){
        debits.currencySum[this]=0;
        credits.currencySum[this]=0;
      });

      jQuery('#'+value+'_transactions .transactionRow').each(function(){
          var transaction = {
              'currency':jQuery(this).find('.transactionRowPrice').text().replace(/[\w\s-.,]/g, ''),
              'price':toNumber(jQuery(this).find('.transactionRowPrice').text()),
/*              'date':jQuery(this).find('.transactionRowDate').text(),
              'event':jQuery(this).find('.transactionRowEvent').text(),
              'description':jQuery(this).find('.transactionRowEvent .transactionRowTitle').text(),
              'descriptionSub':jQuery(this).find('.transactionRowEvent .itemSubtext').text() */
          };

          /* Special case for Russian Rubles */
          if (transaction.currency.toString() === 'уб'){
              transaction.currency = 'pуб';
          }

          /* add new currencies */
          var currency_string = transaction.currency.toString();
            if ((jQuery.inArray(transaction.currency, currencies) === -1) && (transaction.currency)){
                currencies.push(currency_string);
                totals.debits[currency_string]=0;
                totals.credits[currency_string]=0;
                totals.wallet[currency_string]=0;
                debits.currencySum[currency_string]=0;
                credits.currencySum[currency_string]=0;
            }

          /* Check if the transaction was a credit to the account */
          if (jQuery(this).find('.transactionRowEvent').hasClass('walletcredit')){
            /* sum currencies individually */
            if (transaction.currency){
                credits.currencySum[currency_string] += transaction.price;
                totals.credits[currency_string] += transaction.price;
                if (value==='store') { /* Save added fundy by store for total spent calculation */
                  totals.wallet[currency_string] += transaction.price;
                }
            }
            credits.transactions.push(transaction);
            totals.creditsCount +=1;
          }
          /* Or debit */
          else if (jQuery(this).find('.transactionRowEvent').hasClass('charge')){
            /* sum currencies individually */
            if (transaction.currency){
                debits.currencySum[currency_string] += transaction.price;
                totals.debits[currency_string] += transaction.price;
            }
            debits.transactions.push(transaction);
            totals.debitsCount += 1;
          }
          /* count CD keys*/
          else if (jQuery(this).find('.transactionRowEvent').hasClass('cdkey')){
            totals.cdkeyCount += 1;
          }
      });

      /* Accounts output */
      total = '0.00';
      if (currencies.length > 0) {
        total = currencies[0] + formatNum(debits.currencySum[currencies[0]]-credits.currencySum[currencies[0]]);
      }
      jQuery('.sr'+value).remove();
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+'"><div class="accountData price">'+total+'</div><div class="accountLabel">'+value.charAt(0).toUpperCase()+value.slice(1)+' Transactions <a id="srj'+value+'" href="javascript:(function(){if(jQuery(\'#srj'+value+'\').text()===\'[+]\') {jQuery(\'#srj'+value+'\').text(\'[-]\');jQuery(\'.srh'+value+'\').show();} else {jQuery(\'#srj'+value+'\').text(\'[+]\');jQuery(\'.srh'+value+'\').hide();}})();">[+]</a></div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<table id="steam_'+value+'_account_table" class="sr'+value+' srh'+value+'" style="margin:7px 0;width:100%;border-collapse:collapse;"><tbody><tr style="border-top:2px solid #3c3d3e;border-bottom:1px solid #3c3d3e;}"><th style="border-right:2px solid #3c3d3e;width:50%">Debit</th><th>Credits</th></tr></tbody></table>');
      jQuery(currencies).each(function(){
        jQuery('#steam_'+value+'_account_table tbody').append('<tr><td style="border-right:2px solid #3c3d3e;padding-left:.5em;">'+this+formatNum(debits.currencySum[this])+'</td><td style="padding-left:.5em;">'+this+formatNum(credits.currencySum[this])+'</td></tr>');
      });
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="margin:0"><div class="accountData">'+debits.transactions.length+'</div><div class="accountLabel">'+((value==='store') ? 'Purchase' : 'Steam Wallet Debiting')+' Transactions</div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="margin:0"><div class="accountData">'+credits.transactions.length+'</div><div class="accountLabel">Steam Wallet Crediting Transactions</div></div>');
      if (value==='store') jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="margin:0"><div class="accountData">'+totals.cdkeyCount+'</div><div class="accountLabel">CD Key Redemption Transactions</div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="border-top:1px solid #3c3d3e;margin-bottom:16px"><div class="accountData">'+(((value==='store') ? totals.cdkeyCount : 0)+debits.transactions.length+credits.transactions.length)+'</div><div class="accountLabel">Total Transactions</div></div>');
      jQuery('.srh'+value).hide();
    });

    /* Totals output */
    jQuery('.srtotal').remove();
    total = '0.00';
    if (currencies.length > 0) {
      total = currencies[0] + formatNum(totals.debits[currencies[0]] - totals.credits[currencies[0]]);
    }
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal" style="border-top:1px solid #3c3d3e;padding-top:6px;"><div class="accountData price">'+total+'</div><div class="accountLabel">Total <a id="srjtotal" href="javascript:(function(){if(jQuery(\'#srjtotal\').text()===\'[+]\') {jQuery(\'#srjtotal\').text(\'[-]\');jQuery(\'.srhtotal\').show();} else {jQuery(\'#srjtotal\').text(\'[+]\');jQuery(\'.srhtotal\').hide();}})();">[+]</a></div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<table id="steam_total_account_table" class="srtotal srhtotal" style="margin:7px 0;width:100%;border-collapse:collapse;"><tbody><tr style="border-top:2px solid #3c3d3e;border-bottom:1px solid #3c3d3e;}"><th style="border-right:2px solid #3c3d3e;width:50%">Debit</th><th>Credit</th></tr></tbody></table>');
    jQuery(currencies).each(function(){
        jQuery('#steam_total_account_table tbody').append('<tr><td style="border-right:2px solid #3c3d3e;padding-left:.5em;">'+this+formatNum(totals.debits[this])+'</td><td style="padding-left:.5em;">'+this+formatNum(totals.credits[this])+'</td></tr>');
    });
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+totals.debitsCount+'</div><div class="accountLabel">(Store/Market/Ingame) Buying Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+totals.creditsCount+'</div><div class="accountLabel">Steam Wallet Crediting Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+totals.cdkeyCount+'</div><div class="accountLabel">CD Key Redemption Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="border-top:1px solid #3c3d3e;"><div class="accountData">'+(totals.cdkeyCount+totals.debitsCount+totals.creditsCount)+'</div><div class="accountLabel">Total Transactions</div></div>');
    jQuery('.srhtotal').hide();

    /* Total Invsested output */
    total = '0.00';
    if (currencies.length > 0) {
      currentWallet = jQuery('.accountRow.accountBalance .accountData.price').filter(function() {return(jQuery(this).parent().attr('class').replace(/accountRow|accountBalance|\s*/g, "") == '');}).text(); /* Filter the only element that has only the original CSS classes */
      total = currencies[0] + formatNum(totals.debits[currencies[0]] - totals.credits[currencies[0]] + totals.wallet[currencies[0]] + toNumber(currentWallet)) + ((currencies.length > 1) ? 'Please contact the developer. You have more than one currency in you account, but only the first one found is displayed.' : '');
    }
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="inner_rule srtotal"></div><div class="accountRow accountBalance srtotal"><div class="accountData price">'+total+'</div><div class="accountLabel">Total Invested (real money)</div></div><div class="inner_rule srtotal"></div>');
}
  else{
    alert('This script only works at:\n\nhttps://store.steampowered.com/account/');
  }
/*});*/

function formatNum(num) {
  num = Math.round(num*100)/100;
  sp = num.toString().split('.');
  switch (sp.length) {
    case 0:
    case 1:
      return num + '.00';
      break;
    case 2:
      if (sp[1].length==1) {
        return num + '0';
      }
      return sp.join('.');
      break;
    default:
      return num;
      break;
  }
}

function toNumber(price) {
  return Number(price.replace(/[^\d.,-]/g, '').replace('\,','\.').replace(/-/g,'0'));
}