@extends('layouts.primary')

@section('content')
  <div class="photographer-info" data-photographer-slug="{{ isset($photographerSlug) ? $photographerSlug : '' }}">
    <div class="pure-g photographer-bio-section">
      <div class="pure-u-2-3">
        <div class="pure-g">
          <div class="photographer-bio-photo pure-u-1-3">
            <img src="" class="pure-img" />
          </div>

          <div class="photographer-bio-info pure-u-2-3">
            <div class="photographer-bio-title-name"></div>
            <div class="photographer-bio-description">
              <div class="photographer-bio-description-title">
                Bio
              </div>

              <div class="photographer-bio-description-content">

              </div>
            </div>
          </div>
        </div>
      </div>  
      
      <div class="pure-u-1-3">
        <div class="photographer-bio-fields">
          <div class="photographer-bio-field photographer-bio-field-phone">
            <div class="photographer-bio-field-title">
              Phone
            </div>
            
            <div class="photographer-bio-field-value photographer-bio-field-phone-value">
              
            </div>
          </div>
          
          <div class="photographer-bio-field photographer-bio-field-email">
            <div class="photographer-bio-field-title">
              Email
            </div>
            
            <div class="photographer-bio-field-value photographer-bio-field-email-value">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pure-g photographer-album-section">
      <!-- autofilled -->
      <div class="pure-u-1-1">
        <div class="photographer-album-rows">
          
        </div>
      </div>
    </div>
  </div>
@endsection