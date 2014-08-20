Steam Accounting Bookmarklet
============================

Steam Accounting Bookmarklet is a JavaScript that that sums up all your Steam purchases and compares them with all Steam wallet funds you once had. It also gives you a total overview about your spending within Steam. (Redeemed CD keys are only counted, not priced.)

What does it do?
------
This JavaScript adds 3 accounts (in grey boxes): ingame, market and store.
- *ingame*: You can see how much money you spent in in-game stores.
- *market*: Lets you see how much you made by selling stuff and how much you spent. If your "Total Spent" is negative, you gained money. Otherwise you spend funds you bought in the shop."
- *store*: Here you see how much money you spent on products in the store (Debit) and for adding funds to your wallet (Credit). The number of transactions also includes complimentary products. If your "Total Spent" amount is negative, you bought more Steam wallet funds than products in the store. You might have spent it in-game or on the market instead of store products. Or you still have it in your wallet. (This is the case if your balance is negative in the bluish grey box at the top.)

Above the accounts you see the total Steam balance from the original Steam Receipt Bookmarklet in the bluish grey box. If the "Total Spent" number is negative, it shows you the amount of money you have left in your Steam wallet. Furthermore this is the place where you can see how many CD Keys you redeemed.

Usage
-----
Simply create a new bookmark with the contents of the js file and put it between "```javascript:(function(){```" and "```})();```". When you're on your account page, click the bookmarklet to get a summary of your account spending at the top of the page.
> If you want always the newest version of the script, you may add the following to you bookmarks (create a new bookmark with your browsers bookmark manager):
```
javascript:(function(){var%20e=document.createElement("script");e.type="text/javascript";e.src="https://raw.githubusercontent.com/hihain/steam-accounting-bookmarklet/master/steamaccounting.js";document.getElementsByTagName("head")[0].appendChild(e)})();
```

Limitations/Known Issues
------------------------
Steam does track key redemptions (from game bundles, retail purchase, etc.), but has no way of knowing how much you paid for it, so those costs are excluded.

I just do not know what happens if you use a voucher for adding Steam funds. Perhaps you won't see the funds adding to your balance... Let me know!

Authors
------
Jonathan Prusik @jprusik [www.classynemesis.com](http://www.classynemesis.com)

Hauke Hain @hihain