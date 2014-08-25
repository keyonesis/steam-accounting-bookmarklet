Steam Accounting Bookmarklet
============================

Steam Accounting Bookmarklet is a JavaScript that gives you an overview about your spending within Steam.
It basically sums up all your Steam purchases and compares them with the Steam wallet funds you once had by selling items on the market or buying them in the Steam store. Redeemed CD keys are only counted, not priced. Besides the Steam wallet point of view there is also one number ("Total Invested") calculated that tells you how much real-world money you invested in your Steam account.

What does it do?
------
This JavaScript adds 4 accounts: Ingame, Market, Store and Total. There is also an number called "Total Invested" added. You can find them on the right of your account page in the "Your Steam Account" box.
- *Store*: Here you see how much money you spent on products in the store (Debit) and on adding funds to your Steam wallet (Credit). The total number shows the difference between Credit and Debit. It is *not* (necessarily) the total you paid with real-world money in the Steam store! See "Total Invested" for more information. The number may be useful if you spent all your Steam wallet funds in the store or you have not spent any wallet funds in the store (but perhaps in in-game stores as well as the market). In this case it compares your spending for games (direct purchases) with you spending on wallet funds. If your "Store Transactions" amount is negative, you bought more Steam wallet funds in the store than paid for store products. You might have spent your funds on the market, in an in-game store or you still have some in your Steam wallet. See also "Total" for more information. By the way: You can see here how many CD keys you have redeemed. The number of "Purchase Transactions" also includes complimentary products. 
- *Ingame*: Shows you how much money you spent in in-game stores.
- *Market*: Balances the funds you gained and spent by selling or buying items on the market. If your earnings are higher than your expenses "Market Transactions" is negative. (This is good.) A positive number tells you how much of the funds you bought in the Steam store you have spent in the market place.
- *Total*: "Total" sums up all your expenses and earnings in terms of your Steam wallet. So "Debit" shows in this account your total spent. But it may include funds that you have not paid with your hard-earned money but gained by using the Steam market. Look at the next number "Total Invested" for the amount of real-world money you invested in your Steam account.  If the "Total" number is positive, you bought products in the Steam store and didn't paid with your Steam wallet (but by credit card or any other payment method supported by Steam). If the "Total" number is negative, it shows you the amount of money you have left in your Steam wallet, if have always paid your store products with your Steam wallet funds as well. If you have ever paid a store product directly with any payment method Steam offers, the negative amount equals your wallet balance minus the sum of all your products you paid with any other method than Steam wallet). So it only indicates in this case, that you have still more funds on your wallet than you have spent money by paying store products with your credit card (or any other method besides Steam wallet). So only if you always paid with your Steam wallet, you can get a total of zero.(If you have spent all the funds you bought).
- *Total Invested*: This number shows you how much money you invested in your Steam account respectively how much you paid Valve over the years. It if is equal to your Steam wallet balance it either means you haven't made any purchases (besided adding funds to your wallet) or you gained Steam wallet funds by using the Steam market that equals the amount you paid Valve (with any payment method but the Steam wallet) for products or wallet funds on the Steam store.

Important: To see the accounts and not only the totals you need to click on the "[+]" link. Below the accounts you can see the number of transactions you made.

Debit means: funds left your Steam wallet (or in case of the Steam store also your credit card etc.); Credit: funds got added to your Steam wallet.

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

Author
------
Steam Accounting: Hauke Hain @hihain


>Steam Accounting Bookmarklet is originally a fork of Steam Reciept by

>Jonathan Prusik @jprusik [www.classynemesis.com](http://www.classynemesis.com)

>Today they only share a few bity and bytes of source code. :)