## Photography Portfolio Example

### Development Process

I took a very scalable approach with regards to development. You'll notice that the base URL will redirect to /me. This is done so that the website does support the additional of multiple photographers if the website owner so choses to continue to add photographers. As such, the /me is a slug which then points to a set of galleries/albums and photos.

I leveraged Laravel MIX with LESS to generate clean CSS for use on the frontend.

I did debate leveraging a frontend framework like Angular or Ember. However, I thought it would be "overkill" for this project considering, at this point, it's only 1 page. I instead resorted to building a clean Javascript library to operate the site.

I leveraged migrations for database creation. You'll notice a migration which removes a column. I had basically discovered, through developing, that I could set the "display image" boolean on the photo instead of defining this statically within the galleries table (creating a column with a path). I felt this made more sense since it would be easier for record keeping, and could even go further to allow for multiple "featured" images (potentially a future feature).
I think it's extremely important for developers to constantly be re-evaluating elements like database schemas to ensure they are taking the best possible approach with scalability, data integrity and future development ease in mind. 

For additional features, I did leverage FontAwesome for the social media icons that I placed into the bio of the photographer. I thought this was an essential feature and FontAwesome provided a really easy way of implementing this along with the heart icon for featured albums/galleries.

I also had the background be a random blurred image from any of the enabled galleries, and added a "enabled" column in order to enable/disable galleries at any time.

With regards to libaries, I used jQuery to speed up development time. I also used PureCSS to speed up the creation of the HTML / responsiveness / grids.

### Difficulties

The primary difficulty I had was in deciding the specific approach with regards to the data structure and actually importing the data. Because this is such a small site, I didn't see a purpose in wasting valuable development time which could be placed on other features in creating a "automatic" script to import galleries and photos from the original JSON.
While I am a fan of automation and always agree it should be taken into consideration, there is such thing as over-automation, and I felt for the 6 galleries it just made more sense to simply import the data manually. 

If the site had far more than 6 galleries, or if there was the intention to add more in the future, I think a script would have been feasable / important.

This also goes into respect with regards to lazy loading. If there were more than 10 galleries, I would've implemented a pagination/lazy loading system so that not all galleries are loaded at once. This reduces load on the server and would make more sense for a larger portfolio.
Due to the amount of galleries only being 6, and the specific ask to have the output match the original JSON, I didn't believe this made sense to implement.

I did make one small modification to the output of the API. I did add a "status" boolean to the output of the API. I felt this was neccessary, especially when developing with a multi-photographer setup/scalability like I did. If an incorrect slug was provided, an error code would be helpful in decifering bugs.

Also, while I would've preferred to leverage multiple API requests in a true RestFUL fashion (seperate endpoints for photographer, gallery, photos, etc), I do believe it may have been overkill for a simple site and it would not have matched the original JSON as per request.

If the photographers information didn't have to be pulled from AJAX, I would've instead used Laravel Blade and placed it directly into the HTML, leaving the galleries/photos to be pulled through the API/Ajax. I feel as if this makes more sense for loading the site, SEO, and just general ease of access to the information from any of the pages.

### Thanks!

Thanks for taking this project into consideration. It was definitely a fun project to create!

If this was a production site, there is definitely more room for growth, and I believe I setup the project up in a scalable manner so as to make this as easy as possible.