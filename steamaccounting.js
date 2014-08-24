/*jQuery(document).ready(function(){*/
  if (/^https\:\/\/store\.steampowered\.com\/accoun.+/.test(location.href)) {
    var totals={/*'transactions':[], */'currencyList':[], 'currencyTotals':[], 'transactionCount':0, 'cdkeyCount':0, 'creditsCount':0};
    
    jQuery.each(['store','ingame','market'], function( index, value ){
      var debits={'transactions':[], 'currencySum':[]};
      var credits={'transactions':[], 'currencySum':[]};

      /* initialize currencySum */
      jQuery(totals.currencyList).each(function(){
        debits.currencySum[this]=0;
        credits.currencySum[this]=0;
      });

      jQuery('#'+value+'_transactions .transactionRow').each(function(){
          var transaction = {
              'currency':jQuery(this).find('.transactionRowPrice').text().replace(/[\w\s-.,]/g, ''),
              'price':Number(jQuery(this).find('.transactionRowPrice').text().replace(/[^\d.,-]/g, '').replace('\,','\.').replace(/-/g,'0')),
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
            if ((jQuery.inArray(transaction.currency, totals.currencyList) === -1) && (transaction.currency)){
                totals.currencyList.push(currency_string);
                totals.currencyTotals[currency_string]=0;
                debits.currencySum[currency_string]=0;
                credits.currencySum[currency_string]=0;
            }

          /* Check if the transaction was a credit to the account */
          if (jQuery(this).find('.transactionRowEvent').hasClass('walletcredit')){
            /* sum currencies individually */
            if (transaction.currency){
                credits.currencySum[currency_string] += transaction.price;
                totals.currencyTotals[currency_string] -= transaction.price; /* substract credits from total */
            }
            credits.transactions.push(transaction);
            totals.creditsCount +=1;
            totals.transactionCount += 1;
            /*transaction.price *=-1;
            totals.transactions.push(transaction);*/
          }
          /* Or debit */
          else if (jQuery(this).find('.transactionRowEvent').hasClass('charge')){
            /* sum currencies individually */
            if (transaction.currency){
                debits.currencySum[currency_string] += transaction.price;
                totals.currencyTotals[currency_string] += transaction.price;
            }
            debits.transactions.push(transaction);
            totals.transactionCount += 1;
            /*totals.transactions.push(transaction);*/
          }
          /* count CD keys*/
          else if (jQuery(this).find('.transactionRowEvent').hasClass('cdkey')){
            totals.cdkeyCount += 1;
            totals.transactionCount += 1;
            /*totals.transactions.push(transaction);*/
          }
      });

      /* Accounts output */
      total = '0.00';
      if (totals.currencyList.length > 0) {
        total = totals.currencyList[0] + formatNum(Math.round((debits.currencySum[totals.currencyList[0]]-credits.currencySum[totals.currencyList[0]])*100)/100);
      }
      jQuery('.sr'+value).remove();
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+'"><div class="accountData price">'+total+'</div><div class="accountLabel">'+value.charAt(0).toUpperCase()+value.slice(1)+' Transactions <a id="srj'+value+'" href="javascript:(function(){if(jQuery(\'#srj'+value+'\').text()===\'[+]\') {jQuery(\'#srj'+value+'\').text(\'[-]\');jQuery(\'.srh'+value+'\').show();} else {jQuery(\'#srj'+value+'\').text(\'[+]\');jQuery(\'.srh'+value+'\').hide();}})();">[+]</a></div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<table id="steam_'+value+'_account_table" class="sr'+value+' srh'+value+'" style="margin:7px 0;width:100%;border-collapse:collapse;"><tbody><tr style="border-top:2px solid #3c3d3e;border-bottom:1px solid #3c3d3e;}"><th style="border-right:2px solid #3c3d3e;width:50%">Debit</th><th style="width:50%">Credits</th></tr></tbody></table>');
      jQuery(totals.currencyList).each(function(){
        jQuery('#steam_'+value+'_account_table tbody').append('<tr><td style="text-align: left;border-right: 2px solid #3c3d3e;padding-left:.5em;">'+this+formatNum(Math.round(debits.currencySum[this]*100)/100)+'</td><td style="padding-left:.5em;">'+this+formatNum((Math.round(credits.currencySum[this]*100)/100)+'</td></tr>'));
      });
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="margin:0"><div class="accountData">'+debits.transactions.length+'</div><div class="accountLabel">'+((value==='store') ? 'Purchase' : 'Steam Wallet Debiting')+' Transactions</div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="margin:0"><div class="accountData">'+credits.transactions.length+'</div><div class="accountLabel">Steam Wallet Crediting Transactions</div></div>');
      jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance sr'+value+' srh'+value+'" style="border-top:1px solid #3c3d3e;margin-bottom:16px"><div class="accountData">'+(debits.transactions.length+credits.transactions.length)+'</div><div class="accountLabel">Total Transactions</div></div>');
      jQuery('.srh'+value).hide();
    });

    /* Totals output */
    jQuery('.srtotal').remove();
    total = '0.00';
    if (totals.currencyList.length > 0) {
      total = formatNum(totals.currencyList[0] + formatNum(Math.round(totals.currencyTotals[totals.currencyList[0]]*100)/100));
    }
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal" style="border-top:1px solid #3c3d3e;padding-top:6px;"><div class="accountData price">'+total+'</div><div class="accountLabel">Total Spent <a id="srjtotal" href="javascript:(function(){if(jQuery(\'#srjtotal\').text()===\'[+]\') {jQuery(\'#srjtotal\').text(\'[-]\');jQuery(\'.srhtotal\').show();} else {jQuery(\'#srjtotal\').text(\'[+]\');jQuery(\'.srhtotal\').hide();}})();">[+]</a></div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<table id="steam_total_account_table" class="srtotal srhtotal" style="margin:7px 0;width:100%;border-collapse:collapse;"><tbody><tr style="border-top:2px solid #3c3d3e;border-bottom:1px solid #3c3d3e;}"><th style="border-right:1px solid #3c3d3e;width:50%;text-align:right;padding-right:.5em">Currency</th><th style="text-align:left;padding-left:0.5em;">Total</th></tr></tbody></table>');
    jQuery(totals.currencyList).each(function(){
        jQuery('#steam_total_account_table tbody').append('<tr><td style="border-right:1px solid #3c3d3e;text-align:right;padding-right:.5em;">'+this+'</td><td style="padding-left:.5em;">'+formatNum(Math.round(totals.currencyTotals[this]*100)/100)+'</td></tr>');
    });
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+(totals.transactionCount-totals.cdkeyCount-totals.creditsCount)+'</div><div class="accountLabel">(Store/Market/Ingame) Buying Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+totals.cdkeyCount+'</div><div class="accountLabel">CD Key Redemption Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="margin:0"><div class="accountData">'+totals.creditsCount+'</div><div class="accountLabel">Steam Wallet Crediting Transactions</div></div>');
    jQuery('.accountInfoBlock .accountBalance:last').before('<div class="accountRow accountBalance srtotal srhtotal" style="border-top:1px solid #3c3d3e;"><div class="accountData">'+totals.transactionCount+'</div><div class="accountLabel">Total Transactions</div></div><div class="inner_rule srtotal"></div>');
    jQuery('.srhtotal').hide();
}
  else{
    alert('This script only works at:\n\nhttps://store.steampowered.com/account/');
  }
/*});*/

function formatNum(num) {
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