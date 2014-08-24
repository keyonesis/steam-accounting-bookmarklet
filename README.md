Steam Accounting Bookmarklet
============================

Steam Accounting Bookmarklet is a JavaScript that gives you an overview about your spending within Steam.
It basically sums up all your Steam purchases and compares them with the Steam wallet funds you once had by selling items on the market or buying them in the Steam store. Redeemed CD keys are only counted, not priced. Besides the Steam wallet point of view there is also one number ("Total Invested") calculated that tells you how much real world money you invested in your Steam account.

What does it do?
------
This JavaScript adds 4 accounts: Ingame, Market, Store and Total. There is also an number called "Total Invested" added. You can find them on the right of your account page in the "Your Steam Account" box.
- *Store*: Here you see how much money you spent on products in the store (Debit) and on adding funds to your Steam wallet (Credit). The number of transactions also includes complimentary products. If your "Store Transactions" amount is negative, you bought more Steam wallet funds in the store than products. You might have spent your funds on the market, at an in-game store or you still have funds in your Steam wallet. See also "Total" for more information. By the way: You can see here how many CD keys you redeemed.
- *Ingame*: You can see how much money you spent in in-game stores.
- *Market*: Balances the funds you gained by selling items on the market and how much you spent. If your earnings are higher than your expenses "Market Transactions" is negative. Otherwise you spent funds you bought in the Steam store."
- *Total*: "Total" sums up all your expenses and earnings in terms of your Steam wallet. So "Debit" shows in this account your total spent. But it may include funds that you have not paid with you hard-earned money but gained from the Steam market. Look at the next number "Total Invested" for the real world money you invested in your Steam account. If the "Total" number is negative, it shows you the amount of money you have left in your Steam wallet. If the amount is positive, you bought products in the Steam store and didn't paid with your Steam wallet (but by creadit card or any other payment method supported by Steam). So only if you always paid with your Steam wallet, you can get a total of zero if you have spent all the fundy you bought via the Steam store.
- *Total Invested*: This number shows you how much money you invested in your Steam account respectively how much you paid Valve over the years.

Important: To see the accounts and not only the totals you need to click on the "[+]" link. Below the accounts you can see the number of transactions you made.

Debit means: funds left your Steam wallet; Credit: funds got added to your Steam wallet.

Usage
-----
Simply create a new bookmark with the contents of the js file and put it between "```javascript:(function(){```" and "```})();```". When you're on your account page, click on your bookmarklet to get a summary of your account spending in the "Your Steam Account" box to the top right.
> If you want always the newest version of the script, you may add the following to you bookmarks (create a new bookmark with your browsers bookmark manager):
```
javascript:(function(){var e=document.createElement("script");e.type="text/javascript";e.src="https://raw.githubusercontent.com/hihain/steam-accounting-bookmarklet/master/steamaccounting.js";document.getElementsByTagName("head")[0].appendChild(e)})();
```

Limitations/Known Issues
------------------------
Key redemptions (from retail purchases, etc.) are only counted, not priced. Steam does not know how much or if you paid for them.

If your account displays more than one currency, the totals show only the first currency found. You can see all in your account. This should not be a problem anymore as Steam displays today only your native store currency.

I just do not know what happens if you use a voucher for adding Steam funds. Let me know!

Authors
------
Steam Accounting: Hauke Hain @hihain

Original Steam Reciept code: Jonathan Prusik @jprusik [www.classynemesis.com](http://www.classynemesis.com)