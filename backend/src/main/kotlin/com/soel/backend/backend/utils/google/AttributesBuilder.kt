package com.soel.backend.backend.utils.google

import com.fasterxml.jackson.databind.node.BooleanNode
import com.soel.backend.backend.model.*

class AttributesBuilder{
    private var attributes: List<GoogleLocationAttribute>? = null

    fun snsLink(attributeName: String, snsUrl: String) = apply {
        this.attributes = listOf(
            GoogleLocationAttribute(
                name = attributeName,
                valueType = GoogleLocationAttributeValueType.URL,
                uriValues = listOf(
                    GoogleLocationAttributeUriValue(
                        uri = snsUrl
                    )
                ),
            )
        )
    }

    fun menuLink(attributeName: String, menuUrl: String) = apply {
        this.attributes = listOf(
            GoogleLocationAttribute(
                name = attributeName,
                valueType = GoogleLocationAttributeValueType.URL,
                uriValues = listOf(
                    GoogleLocationAttributeUriValue(
                        uri = menuUrl
                    )
                ),
            )
        )
    }

    fun boolAttribute(attributeName: String, value: Boolean) = apply {
        this.attributes = listOf(
            GoogleLocationAttribute(
                name = attributeName,
                valueType = GoogleLocationAttributeValueType.BOOL,
                values = listOf(BooleanNode.valueOf(value))
            )
        )
    }

    fun build(): GoogleLocationAttributesModel {
        return GoogleLocationAttributesModel(
            attributes = attributes
        )
    }

    companion object {
        fun builder() = AttributesBuilder()
    }
}