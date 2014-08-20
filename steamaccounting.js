if ((location.href === 'https://store.steampowered.com/account/') || ((location.href === 'https://store.steampowered.com/account'))) {
    var steamReceipt={'transactions':[], 'currencyList':[], 'currencyTotals':[], 'wallet':jQuery('.price')[0].innerHTML, 'transactionCount':0, 'cdkeyCount':0, 'credits':0};

    jQuery.each(['store','ingame','market'], function( index, value ){
      var debits={'transactions':[], 'currencySum':[]};
      var credits={'transactions':[], 'currencySum':[]};

      /* initialize currencySum */
      jQuery(steamReceipt.currencyList).each(function(){
        debits.currencySum[this]=0;
        credits.currencySum[this]=0;
      });

      jQuery('#'+value+'_transactions .transactionRow').each(function(){
          var transaction = {
              'date':jQuery(this).find('.transactionRowDate').text(),
              'currency':jQuery(this).find('.transactionRowPrice').text().replace(/[\w\s-.,]/g, ''),
              'price':Number(jQuery(this).find('.transactionRowPrice').text().replace(/[^\d.,-]/g, '').replace('\,','\.').replace(/-/g,'0').split('.').splice(0,2).join('.')),
              'event':jQuery(this).find('.transactionRowEvent').text(),
              'description':jQuery(this).find('.transactionRowEvent .transactionRowTitle').text(),
              'descriptionSub':jQuery(this).find('.transactionRowEvent .itemSubtext').text()
          };

          /* Special case for Russian Rubles */
          if (transaction.currency.toString() === 'уб'){
              transaction.currency = 'pуб';
          }

          /* add new currencies */
          var currency_string = transaction.currency.toString();
            if ((jQuery.inArray(transaction.currency, steamReceipt.currencyList) === -1) && (transaction.currency)){
                steamReceipt.currencyList.push(currency_string);
                steamReceipt.currencyTotals[currency_string]=0;
                debits.currencySum[currency_string]=0;
                credits.currencySum[currency_string]=0;
            }

          /* Check if the transaction was a credit to the account */
          if (jQuery(this).find('.transactionRowEvent').hasClass('walletcredit')){
            /* sum currencies individually */
            if (transaction.currency){
                credits.currencySum[currency_string] += transaction.price;
                steamReceipt.currencyTotals[currency_string] -= transaction.price; /* substract credits from total */
            }
            credits.transactions.push(transaction);
            /* steamReciept only: */
            steamReceipt.credits +=1;
            transaction.price *=-1;
            steamReceipt.transactionCount += 1;
            steamReceipt.transactions.push(transaction);

          }
          /* Or debit */
          else if (jQuery(this).find('.transactionRowEvent').hasClass('charge')){
            /* sum currencies individually */
            if (transaction.currency){
                debits.currencySum[currency_string] += transaction.price;
                steamReceipt.currencyTotals[currency_string] += transaction.price;
            }
            debits.transactions.push(transaction);
            /* steamReciept only: */
            steamReceipt.transactionCount += 1;
            steamReceipt.transactions.push(transaction);
          }
          /* for steamReciept only: count CD keys*/
          else if (jQuery(this).find('.transactionRowEvent').hasClass('cdkey')){
            steamReceipt.cdkeyCount += 1;
            steamReceipt.transactionCount += 1;
            steamReceipt.transactions.push(transaction);
          }
      });

      /* Accounting output */
			jQuery('#sr'+value).remove();
      jQuery('.page_title_area').after('<div id="sr'+value+'" style="width:100%;margin:1em 0px;padding: 1em;background-color:#262626;color:#b0aeac"><p style="width:50%;float:left;">You\'ve made '+(debits.transactions.length+credits.transactions.length)+' '+value+' transactions on Steam .<br/><br/>Your Steam wallet was debited by '+debits.transactions.length+' transactions.<br/>Funds were added to your Steam wallet by '+credits.transactions.length+' transactions.<br/><br/>The total amount spent on the transactions \(within Steam\) can be seen to the right. Debit means: money were spent from your Steam wallet. Credit: funds got added to your Steam wallet.</p><table id="steam_'+value+'_account_table" style="width:50%;float:right;border-width:0;border-collapse:collapse;"><tbody><tr><th colspan="2" style="border-bottom: 2px solid #b0aeac;">'+value+' transactions</th></tr><tr style="border-bottom: 1px solid #b0aeac;}"><th style="border-right:2px solid #b0aeac;width:50%">Debit</th><th style="width:50%">Credits</th></tr></tbody></table><hr style="clear:right"/><p style="margin-top:1em"><strong>Total Spent:</strong> <span id="srTotal'+value+'" style="padding-left:1em"></span><br/><small>(if negative, the funds gained in this account exceed your spending)</small></p><p style="clear:both;padding-top:.4em;font-size:.8em;">Steam Accounting (based on Steam Receipt, see above) Readme and the Source Code can be found at <a href="https://github.com/hihain/steam-receipt-bookmarklet">GitHub</a>.</p></div>');
      jQuery(steamReceipt.currencyList).each(function(){
        jQuery('#steam_'+value+'_account_table tbody').append('<tr><td class="sg_col2" style="text-align: left;border-right: 2px solid #b0aeac;">'+this+(Math.round(debits.currencySum[this]*100)/100)+'</td><td class="sg_col2">'+this+(Math.round(credits.currencySum[this]*100)/100)+'</td></tr>');
        jQuery('#srTotal'+value+'').append(this+(Math.round((debits.currencySum[this]-credits.currencySum[this])*100)/100)+' / ');
      });
    });


    /* Build the tables for the page */
    jQuery('#steam_gauge_wrapper').remove();
    jQuery('.page_title_area').after('<div id="steam_gauge_wrapper"><p id="steam_gauge_receipt">You\'ve made '+steamReceipt.transactionCount+' transactions on Steam.<br/><br/>'+steamReceipt.cdkeyCount+' of those are product redemptions on Steam for external purchases (aka CD keys, so Steam doesn\'t know how much you paid).<br/><br/>'+steamReceipt.credits+' of those transactions added funds to your Steam wallet.<br/><br/>The total amount spent on your Steam account \(within Steam\) can be seen to the right. These totals include store purchases, wallet funding, gift purchases, in-game purchases, and market purchases.<br/><br/>Your Steam wallet currently contains '+steamReceipt.wallet+'</p><table id="steam_gauge_receipt_table"><tbody><tr style="border-bottom: 1px solid #ddd;}"><th style="text-align:right;padding-right:.5em">Currency</th><th style="text-align:left;padding-left:0.5em;">Total Spent <small>(negative values are credits)</small></th></tr></tbody></table><hr style="width:100%;margin:1em auto;clear:both;"><p style="display:block;width:100%;clear:both;text-align:center;font-weight:bold;">Steam Receipt was developed by <a href="http://www.mysteamgauge.com" style="text-decoration:underline;">Steam Gauge</a> <small>(with some improvements by <a href="https://github.com/hihain/steam-receipt-bookmarklet" style="text-decoration:underline;">hihain</a>)</small> and is in no way affiliated with Valve.</p></div>');
    jQuery(steamReceipt.currencyList).each(function(){
        jQuery('#steam_gauge_receipt_table tbody').append('<tr><td class="sg_col1">'+this+'</td><td class="sg_col2">'+Math.round(steamReceipt.currencyTotals[this]*100)/100+'</td></tr>');
    });
    jQuery('head').append('<style type="text/css">#steam_gauge_wrapper{width:100%;margin:1em 0px;padding: 1em;background-color:slategray;}#steam_gauge_receipt{width:50%;float:left;}#steam_gauge_receipt_table{width:50%;float:right;border-width: 0px !important;border-collapse: collapse !important;}.sg_col1{text-align:right;}.sg_col2{text-align:left;padding-left: 0.5em;}.youraccount_tabs{clear:both;}</style>');
}
else{
    alert('This script only works at:\n\nhttps://store.steampowered.com/account/');
}