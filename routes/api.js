module.exports = {
    testimonies: function(req, res) {
        var testimonies = [
            {
                  "author": "John Smith"
                , "title": "Wonderful Savior"
                , "date": 2012-11-18
                , "description": "In 1972, it seemed that all the doors were closing on us where we lived. A new job opportunity opened up for my husband in Laredo, Texas. I didn’t want to move there, because we were very active in our church where we lived. We were part of the church board, church committees, and were involved in virtually every church related activity. But because of my husband’s job situation, we went ahead and moved our family anyway." 
                , "tags": ["Jesus", "God", "Holy Spirit"]
                , "shareUrl": "http://testim.ony/576ye4"
            }
            , {
                  "author": "Jane Doe"
                , "title": "Testimony of God's Grace"
                , "date": 2012-11-14
                , "description": "It was 2:30 am when the police woke our family to let us know that my older brother had been killed in an automobile accident. My life has never been the same since." 
                , "tags": ["accident", "brother", "grace"]
                , "shareUrl": "http://testim.ony/428ye1"
            }
        ];

        res.json(testimonies);
    }
}
