/*! backbone.search - v0.1.0-pre - 2012-10-10
* https://github.com/boazsender/backbone.search
* Copyright (c) 2012 Boaz Sender; Licensed MIT */

/*! backbone.search - v0.1.0-pre - 2012-10-10
* https://github.com/boazsender/backbone.search
* Copyright (c) 2012 Boaz Sender; Licensed MIT */

/*! backbone.search - v0.1.0-pre - 2012-10-10
* https://github.com/boazsender/backbone.search
* Copyright (c) 2012 Boaz Sender; Licensed MIT */
/*global Backbone:false, _: false, console: false*/

(function(Backbone, _) {

  // Based on John Resig's jQuery LiveSearch: http://ejohn.org/blog/jquery-livesearch
  Backbone.Collection.prototype.search = function ( term ) {

    term = jQuery.trim( term.toLowerCase() );

    var scores =  new Backbone.Collection();

    scores.comparator = function( model ) {
      return model.get( "searchscore" );
    };

    if( term ) {
      this.each( function( model ){
        var score = JSON.stringify( model.toJSON() ).score( term );

        if ( score > 0 ) {
          model.set( "searchscore", score );
          scores.add( model );
        }
      });

    }

    return scores;

  };


  // Based on Lachie Cox's port of the Quicksilver string ranking algorithm:

  // "qs_score" - Quicksilver Score, A port of the Quicksilver string ranking algorithm
  // http://code.google.com/p/jsskep/source/browse/trunk/my+js/quicksilver.js?spec=svn59&r=59

  // modified to lint, be readable and remove dead code, would like to make it
  // take a sting as an arguement, instead of adding `score` to the String.prototype.

  // The Quicksilver code is available here
  // http://code.google.com/p/blacktree-alchemy/
  // http://blacktree-alchemy.googlecode.com/svn/trunk/Crucible/Code/NSString+BLTRRanking.m
  //
  // The MIT License
  //
  // Copyright (c) 2008 Lachie Cox
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  // THE SOFTWARE.


  String.prototype.score = function( abbreviation ) {

    if( abbreviation.length === 0 ) {
      return 0.9;
    }

    if( abbreviation.length > this.length ) {
      return 0.0;
    }

    for( var i = abbreviation.length; i > 0; i-- ) {

      var sub_abbreviation = abbreviation.substring(0,i);
      var index = this.indexOf(sub_abbreviation);

      if( index < 0) {
        continue;
      }

      if( index + abbreviation.length > this.length ){
        continue;
      }

      var next_string = this.substring(index+sub_abbreviation.length);
      var next_abbreviation = null;

      if( i >= abbreviation.length ) {

        next_abbreviation = '';

      } else {

        next_abbreviation = abbreviation.substring(i);

      }

      var remaining_score = next_string.score( next_abbreviation, index );

      if ( remaining_score > 0 ) {

        var score = this.length-next_string.length;

        if( index !== 0 ) {

          var j = 0;
          var c = this.charCodeAt( index - 1 );

          if( c === 32 || c === 9 ) {

            for( j = (index-2); j >= 0; j-- ) {
              c = this.charCodeAt(j);
              score -= ((c === 32 || c === 9) ? 1 : 0.15);
            }

          } else {

            score -= index;

          }

        }

        score += remaining_score * next_string.length;
        score /= this.length;

        return score;

      }

    }

    return 0.0;

  };

}(Backbone, _));