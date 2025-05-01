package com.soel.backend.backend.model

data class GooglePlacesAutoCompleteRequest(
    val input: String,
)

data class GooglePlacesAutoCompleteResponse(
    val placeSetList: List<GooglePlacesAutoCompletePlaceSet>? = null,
)

data class GooglePlacesAutoCompletePlaceSet(
    val placeId: String? = null,
    val text: String? = null,
)

data class GooglePlacesAutoComplete(
    val suggestions: List<GooglePlacesSuggestion>? = null,
)

data class GooglePlacesSuggestion(
    val placePrediction: GooglePlacesPlacePrediction? = null,
)

data class GooglePlacesPlacePrediction(
    val place: String? = null,
    val placeId: String? = null,
    val text: GooglePlacesFormattableText? = null,
    val structuredFormat: GooglePlacesStructuredFormat? = null,
    val types: List<String>? = null,
    val distanceMeters: Int? = null,
)

data class GooglePlacesFormattableText(
    val text: String? = null,
    val matches: List<GooglePlacesStringRange>? = null,
)

data class GooglePlacesStringRange(
    val startOffset: Int? = null,
    val endOffset: Int? = null,
)

data class GooglePlacesStructuredFormat(
    val mainText: GooglePlacesFormattableText? = null,
    val secondaryText: GooglePlacesFormattableText? = null,
)